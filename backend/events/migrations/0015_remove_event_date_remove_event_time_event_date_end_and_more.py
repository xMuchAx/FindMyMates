# Generated by Django 5.0.1 on 2024-02-07 01:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0013_rename_avatar_game_url_remove_game_event_number'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='date',
        ),
        migrations.RemoveField(
            model_name='event',
            name='time',
        ),
        migrations.AddField(
            model_name='event',
            name='date_end',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='date_start',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='duration',
            field=models.DurationField(blank=True),
        ),
    ]
