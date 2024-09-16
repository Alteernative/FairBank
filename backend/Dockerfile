# Stage 1: Build the backend
FROM python:3.11 AS backend

WORKDIR /backend

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

COPY . .

EXPOSE 8000

CMD ["gunicorn", "auth.wsgi:application", "--bind", "0.0.0.0:8000"]
