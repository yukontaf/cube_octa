FROM cubejs/cube:latest
 
COPY . .
RUN apt update && apt install -y pip
RUN pip install -r requirements.txt
RUN npm install