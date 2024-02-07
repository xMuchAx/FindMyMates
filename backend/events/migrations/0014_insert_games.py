from django.db import migrations
import json

def insert_default_games(apps, schema_editor):
    Game = apps.get_model('events', 'Game')

    with open("events/migrations/games.json", "r") as file:
        games_data = json.load(file)

    for game in games_data:
        Game.objects.create(**game)

class Migration(migrations.Migration):
    dependencies = [
        ('events', '0013_rename_avatar_game_url_remove_game_event_number'),
    ]

    operations = [
        migrations.RunPython(insert_default_games),
    ]