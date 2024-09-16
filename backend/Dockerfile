FROM python:3.11

WORKDIR /backend

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

RUN pip install gunicorn

COPY . .

EXPOSE $PORT

CMD ["gunicorn", "auth.wsgi:application", "--bind", "0.0.0.0:$PORT"]
