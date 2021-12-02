import os
import sys

path = str(sys.argv[1])

for image in os.listdir(path):
    os.remove(os.path.join(path, image))

print("Images Deleted")