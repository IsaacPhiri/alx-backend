from flask import Flask, render_template, g, request
from flask_babel import Babel

app = Flask(__name__)
babel = Babel(app)

users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}

def get_user():
    user_id = request.args.get('login_as')
    if user_id:
        try:
            user = users[int(user_id)]
            return user
        except (KeyError, ValueError):
            pass
    return None

@app.before_request
def before_request():
    g.user = get_user()

@babel.localeselector
def get_locale():
    if g.user and g.user['locale']:
        return g.user['locale']
    return request.accept_languages.best_match(['en', 'fr'])

@app.route('/')
def index():
    logged_in_msg = babel.gettext('You are logged in as %(username)s.',
                                  username=g.user['name']) if g.user else None
    not_logged_in_msg = babel.gettext('You are not logged in.')
    return render_template('5-index.html', logged_in_msg=logged_in_msg,
                           not_logged_in_msg=not_logged_in_msg)
