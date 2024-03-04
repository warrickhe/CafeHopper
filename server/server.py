import requests
import sys
import pytz
import time
from datetime import datetime
from flask import Flask, request, jsonify
from api_key import api_key
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


"""
Json expected:
Starting Address:
Distance (straightline), from one cafe to another:
Price point:
Min review:

"""
@app.route('/')
def hello():
    print("request received",file=sys.stderr)
    return "Hello world! WAY/WYA"

def getTZOffset():
    return int(datetime.utcnow().replace(tzinfo=pytz.utc) \
        .astimezone(pytz.timezone('US/Pacific')) \
            .utcoffset().total_seconds())

def mi_to_m(distance):
    return distance*1609.34

def m_to_mi(distance):
    return distance/1609.34

def check_criteria(criteria, business):
    metConditions = True
    if 'min_review_count' in criteria and criteria['min_review_count'] is not None:
        metConditions &= business['review_count']>=int(criteria['min_review_count'])
    if 'min_rating' in criteria and criteria['min_rating'] is not None:
        metConditions &= float(business['rating'])>=float(criteria['min_rating'])
    if 'price' in business:
        if 'max_price' in criteria and criteria['max_price'] != "":
            metConditions &= len(business['price'])<=int(criteria['max_price'])
    else:
        business['price'] = 'unknown'
    return metConditions

def search(address, data, seen_phones, cur_time):
    i = 0
    while True:
        url = 'https://api.yelp.com/v3/businesses/search'
        headers = {
            'Authorization' : f'Bearer {api_key()}'
        }

        #setup params
        params = {
            'location': address,
            'radius': round(mi_to_m(float(data['max_distance']))),
            'term': 'cafe',
            'sort_by': 'distance',
            'limit': 20,
            'offset': 20*i,
            'locale': 'en_US',
            'open_at': cur_time
        }
        if 'wheelchair_accessible' in data['attributes'] and data['attributes']['wheelchair_accessible']:
            params['attributes'] = 'wheelchair_accessible'
        
        i+=1 #i is the amount of offset, assuming we don't find a suitable result on page 1
        response = requests.get(url,headers=headers,params=params).json()
        if 'businesses' not in response or len(response['businesses']) == 0:
            return None
        for business in response['businesses']:
            if check_criteria(data['attributes'],business):
                phone = business['display_phone']
                if phone in seen_phones:
                    continue
                return {
                    'name': business['name'],
                    'image_url': business['image_url'],
                    'review_count': business['review_count'],
                    'rating': business['rating'],
                    'price': business['price'],
                    'location': ', '.join(business['location']['display_address']),
                    'phone': phone,
                    'distance': "{:.2f}".format(m_to_mi(business['distance'])),
                    'categories': business['categories'],
                    'start_time': datetime.fromtimestamp(cur_time).strftime('%m/%d/%Y %H:%M')
                }

@app.route('/getcafes', methods=['POST'])
def getCafes():
    print("request received",file=sys.stderr)
    data = request.get_json()
    print(data,file=sys.stderr)
    print("________________",file=sys.stderr)
    cafes = [data]
    num_cafes = int(data['num_cafes'])
    address = data['address']
    time_per_cafe = int(data['time_per_cafe'])
    seen_phones = set()
    if 'blacklist' in data:
        for phone in data['blacklist']:
            seen_phones.add(phone)
    print(datetime.strptime(data['start_time'], '%m/%d/%Y %H:%M'), file=sys.stderr)
    print(getTZOffset(), file=sys.stderr)
    cur_time = int(time.mktime(datetime.strptime(data['start_time'], '%m/%d/%Y %H:%M').timetuple()))
    for _ in range(num_cafes):
        print("searching",file=sys.stderr)
        cafe = search(address, data, seen_phones, cur_time)
        if cafe is None:
            return jsonify(cafes)   
        print('cafe found', file=sys.stderr)
        print(cafe, file=sys.stderr)
        print(cur_time, file=sys.stderr)
        print('___________________________', file=sys.stderr)
        seen_phones.add(cafe['phone'])
        cafes.append(cafe)
        cur_time += 60*time_per_cafe
    print(cafes,file=sys.stderr)
    return jsonify(cafes)

if __name__ == '__main__':
    app.run(host="localhost", port=7272, debug=True)