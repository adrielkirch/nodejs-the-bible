import sys
import json
from urllib import request

def main():
  item = json.loads(sys.argv[1])
  # print(item.get('name'))
  file_path = item.get('filePath')
  url = item.get('url')
  data = open(file_path, 'rb').read()
  # print(data)
  req = request.Request(url, data)
  response = request.urlopen(req).read().decode('utf-8')
  print(response)

if __name__ == '__main__':
  main()