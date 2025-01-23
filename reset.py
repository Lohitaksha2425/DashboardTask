from flask import Flask, request, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'  # Replace with your DB URI
app.config['SECRET_KEY'] = 'your_secret_key_here'
db = SQLAlchemy(app)

# Table to store old and new passwords
class PasswordHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    old_password = db.Column(db.String(200), nullable=False)
    new_password = db.Column(db.String(200), nullable=False)

# Create the table
@app.route('/reset', methods=['GET', 'POST'])  # Handle both GET and POST methods
def reset_password():
    if request.method == 'POST':
        # Get the form data (old and new passwords)
        old_password = request.form['oldpassword']
        new_password = request.form['newpassword']

        # Create a new PasswordHistory record
        password_history = PasswordHistory(
            old_password=old_password,
            new_password=new_password
        )

        # Add the record to the database
        db.session.add(password_history)
        db.session.commit()

        return 'Password history saved successfully!', 200

    # If GET request, render the reset form
    return render_template('reset.html')  # Make sure reset.html exists in the templates folder

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
