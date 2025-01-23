from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

# Initialize the Flask app and set up the SQLite database
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///namedetails.db'  # Name your database as needed
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Create a model to store the details
class NameDetails(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    design = db.Column(db.String(100), nullable=False)
    ph = db.Column(db.String(15), nullable=False)

# Route for the form page
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        name = request.form['Name']
        email = request.form['Email']
        design = request.form['Design']
        ph = request.form['Ph']

        # Create a new entry in the database
        new_entry = NameDetails(name=name, email=email, design=design, ph=ph)
        db.session.add(new_entry)
        db.session.commit()

        return 'Form Submitted and Data Stored Successfully!'

    return render_template('namedetails.html')  # Render the form template

# Start the app
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
