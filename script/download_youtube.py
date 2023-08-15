import os
from pytube import YouTube
from typing import List
from pydub import AudioSegment

# Script to download Youtube videos, convert them to mp3, and splice them to the right length to be used
# in the music box.
# Update the list of songs in the main function (See if __name__ == "__main__"), run this python script,
# and then copy paste the output into the mycode.js file (../mycode.js)

def get_mp3_folder_absolute():
    return os.path.join(os.path.dirname(os.path.realpath(__file__)), "mp3")


def get_final_sound_folder():
    return os.path.join(os.path.dirname(os.path.realpath(__file__)), "..", "sound")


class Sound:
    """The properties of a sound that needs to be extracted from a YT video"""
    def __init__(self, label, out_name, yt_url, beginning, end) -> None:
        self.label = label
        self.yt_url = yt_url
        self.filename_out = os.path.join(get_mp3_folder_absolute(), out_name)
        self.beginning = beginning
        self.end = end


class MyLogger(object):
    def debug(self, msg):
        pass

    def warning(self, msg):
        pass

    def error(self, msg):
        print(msg)


def dl_to_mp3(yt_url, name):

    yt = YouTube("v=" + yt_url)

    # download only audio
    sound = yt.streams.filter(only_audio=True).first()
    out_file = sound.download(output_path="./mp3/")

    # save the file
    os.rename(out_file, name)


def split_mp3(filename, beg, end):
    print("splitting " + filename)
    try:
        sound = AudioSegment.from_file(filename)
    except:
        sound = AudioSegment.from_file(filename, format="mp4")

    ret_sound = sound[int(beg*1000): int(end*1000)]
    ret_sound.export(os.path.join(get_final_sound_folder(),
                     os.path.basename(filename)), format="mp3")


def dowload_all_sounds(sounds: List[Sound]):
    output = ""
    for s in sounds:
        if not os.path.exists(s.filename_out):
            dl_to_mp3(s.yt_url, s.filename_out)
        split_mp3(s.filename_out, s.beginning, s.end)
        output += f"  new Bt(\"{s.label}\", \"{os.path.basename(s.filename_out)}\"),\n"

    print ("\nMp3 files created. Copy-paste this onto ./mycode.js\n\x1b[33mvar global_buttons = [\n" + output[:-2] + "\n]\n\x1b[0m")

if __name__ == "__main__":
    sounds = [
        Sound("We build this city", "build_city.mp3", "K1b8AhIsSYQ", 5.1, 7.8),
        Sound("She's a brick house", "brick_house.mp3", "rrBx6mAWYPU", 19.9, 25.5),
        Sound("Country roads", "country_roads.mp3", "1vrEljMfXYo", 30.6, 33.1),
        Sound("Imperial March", "imperial_march.mp3", "u7HF4JG1pOg", 10.5, 20.1),
        Sound("On the road again", "road_again.mp3", "dBN86y30Ufc", 10, 12.8),
        Sound("Thick as a brick", "thick_as_a_brick.mp3", "u9bk2MrMGaA", 53.5, 59.8),
        Sound("We will rock you", "rock.mp3", "-tJYN-eG1zk", 30.2, 34),
        Sound("Whool?", "sheep.mp3", "G_MubFgSHdI", 18, 22.9),
        Sound("Piece of wood", "piece_of_wood.mp3", "qYoJoDlv6so", 140.5, 145.3),
        Sound("Rolling in the deep", "rolling.mp3", "rYEDA3JcQqw", 62.8, 67),
        Sound("Jeopardy",  "jeopardy.mp3", "0Wi8Fv0AJA4", 0.5, 31),
        Sound("What do you want?", "wannabe.mp3", "fw-QRyQcFH8", 7, 9.3),
        Sound("We are the champions", "champions.mp3", "04854XqcfCY", 38.9, 46.2),
    ]

    dowload_all_sounds(sounds)
