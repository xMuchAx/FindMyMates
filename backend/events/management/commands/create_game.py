from django.core.management.base import BaseCommand
from events.models import Game

class Command(BaseCommand):
    def handle(self, *args, **options):
        Game.objects.create(name='Fortnite', event_number=12, avatar='https://e7.pngegg.com/pngimages/294/297/png-clipart-fortnite-battle-royale-computer-icons-desktop-battle-royale-game-fortnite-battle-royal-thumbnail.png')
        Game.objects.create(name='Minecraft', event_number=45, avatar='https://e7.pngegg.com/pngimages/294/297/png-clipart-fortnite-battle-royale-computer-icons-desktop-battle-royale-game-fortnite-battle-royal-thumbnail.png')
        Game.objects.create(name='Grand Theft Auto V', event_number=78, avatar='https://e7.pngegg.com/pngimages/294/297/png-clipart-fortnite-battle-royale-computer-icons-desktop-battle-royale-game-fortnite-battle-royal-thumbnail.png')
        Game.objects.create(name=' Among Us', event_number=13, avatar='https://e7.pngegg.com/pngimages/294/297/png-clipart-fortnite-battle-royale-computer-icons-desktop-battle-royale-game-fortnite-battle-royal-thumbnail.png')
        Game.objects.create(name='Apex Legends', event_number=6, avatar='https://e7.pngegg.com/pngimages/294/297/png-clipart-fortnite-battle-royale-computer-icons-desktop-battle-royale-game-fortnite-battle-royal-thumbnail.png')
        Game.objects.create(name='Overwatch', event_number=7, avatar='https://e7.pngegg.com/pngimages/294/297/png-clipart-fortnite-battle-royale-computer-icons-desktop-battle-royale-game-fortnite-battle-royal-thumbnail.png')
        Game.objects.create(name='Warzone', event_number=3, avatar='https://e7.pngegg.com/pngimages/294/297/png-clipart-fortnite-battle-royale-computer-icons-desktop-battle-royale-game-fortnite-battle-royal-thumbnail.png')
        Game.objects.create(name='Rocket League', event_number=6, avatar='https://e7.pngegg.com/pngimages/294/297/png-clipart-fortnite-battle-royale-computer-icons-desktop-battle-royale-game-fortnite-battle-royal-thumbnail.png')
        Game.objects.create(name='Sample Name 3', event_number=9, avatar='https://e7.pngegg.com/pngimages/294/297/png-clipart-fortnite-battle-royale-computer-icons-desktop-battle-royale-game-fortnite-battle-royal-thumbnail.png')
