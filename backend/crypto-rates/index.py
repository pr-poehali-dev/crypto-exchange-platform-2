'''
Business: Получение актуальных курсов криптовалют через CoinGecko API
Args: event - dict с httpMethod, queryStringParameters
      context - объект с атрибутами request_id, function_name
Returns: HTTP response с JSON массивом курсов криптовалют
'''

import json
import urllib.request
import urllib.error
from typing import Dict, Any, List

COINGECKO_API = 'https://api.coingecko.com/api/v3/simple/price'

CRYPTO_IDS = {
    'BTC': 'bitcoin',
    'ETH': 'ethereum',
    'USDT': 'tether',
    'BNB': 'binancecoin',
    'SOL': 'solana',
    'XRP': 'ripple'
}

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        ids = ','.join(CRYPTO_IDS.values())
        url = f'{COINGECKO_API}?ids={ids}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true'
        
        req = urllib.request.Request(url)
        req.add_header('User-Agent', 'Mozilla/5.0')
        
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode('utf-8'))
        
        rates: List[Dict[str, Any]] = []
        
        for symbol, coin_id in CRYPTO_IDS.items():
            if coin_id in data:
                coin_data = data[coin_id]
                rates.append({
                    'symbol': symbol,
                    'price': coin_data.get('usd', 0),
                    'change24h': round(coin_data.get('usd_24h_change', 0), 2),
                    'marketCap': coin_data.get('usd_market_cap', 0)
                })
        
        rates.append({
            'symbol': 'RUB',
            'price': 0.0104,
            'change24h': 0.1,
            'marketCap': 0
        })
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'max-age=60'
            },
            'body': json.dumps({'rates': rates}),
            'isBase64Encoded': False
        }
        
    except urllib.error.URLError as e:
        return {
            'statusCode': 503,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'API unavailable', 'details': str(e)}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Internal error', 'details': str(e)}),
            'isBase64Encoded': False
        }
