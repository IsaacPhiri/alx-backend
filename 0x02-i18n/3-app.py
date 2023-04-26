#!/usr/bin/env python3
"""3-app module"""


from flask import Flask, render_template, request
from flask_babel import Babel, gettext

app = Flask(__name__)
babel = Babel(app)


class Config:
    """Config class"""
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app.config.from_object(Config)


@babel.localeselector
def get_locale():
    """Gets the best-matching language based on request headers"""
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index():
    """Renders index.html"""
    return render_template('3-index.html', title=gettext('home_title'), header=gettext('home_header'))


if __name__ == '__main__':
    app.run()
