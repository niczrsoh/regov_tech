from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

cnx = mysql.connector.connect(
    host="localhost", 
    user='root', 
    password='',
    database='regovtest'
)

print(cnx) 
app = Flask(__name__)
CORS(app)

@app.route('/')
@app.route('/register', methods=['POST'])
def register():
    email = request.json['email']
    password = request.json['password']
    name = request.json['name']
    phone = request.json['phone']

    #check if name and email already exist
    cursor = cnx.cursor()
    cursor.execute("SELECT * FROM user WHERE name = %s", (name,))
    user = cursor.fetchone()
    if user:
        return jsonify({"error": "name already exists"}), 400
    cursor.execute("SELECT * FROM user WHERE email = %s", (email,))
    user = cursor.fetchone()
    if user:
        return jsonify({"error": "Email already exists"}), 400
    
    #insert into database
    
    query = "INSERT INTO user (name, email, password, phone) VALUES (%s, %s, %s, %s)"
    cursor.execute(query, (name, email, password, phone))
    cnx.commit()
    cursor.close()
    return jsonify({"success": "User created successfully"}), 201
    
@app.route('/login', methods=['GET', 'POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    cursor = cnx.cursor()
    cursor.execute("SELECT * FROM user WHERE email = %s AND password = %s", (email, password))
    user = cursor.fetchone()
    if user:
        return jsonify({"success": "Login successful", "userid": user[0]}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401
    
@app.route('/profile', methods=['GET','POST'])
def profile():
    if request.method == 'GET':
        userid = request.args.get('userid')
    if not userid:
        return jsonify({"error": "User ID is required"}), 400
    cursor = cnx.cursor()
    cursor.execute("SELECT * FROM user WHERE userid = %s", (userid,))
    user = cursor.fetchone()
    if user:
        # Return user details without the password
        user_data = {
            "id": user[0],
            "name": user[1],
            "email": user[2],
            "phone": user[4]
        }
        return jsonify(user_data), 200
    else:
        return jsonify({"error": "User not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)