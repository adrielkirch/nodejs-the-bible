IMAGE_URL="https://static.wikia.nocookie.net/mkwikia/images/e/ee/Predator_render.png/revision/latest/thumbnail/width/360/height/360?cb=20160904031753"
IMAGE_BG="https://i.pinimg.com/originals/ba/24/93/ba2493184b33cdbd122322f8757c8f8d.jpg"

# echo "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$IMAGE_BG"

curl "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$IMAGE_BG"
npx autocannon --renderStatusCodes -c500 "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$IMAGE_BG"

#bash run.sh