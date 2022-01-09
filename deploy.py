import shutil
import glob
import os

def deploy(source_path, target_path):
    if not os.path.exists(target_path):
        os.makedirs(target_path)
    for file in glob.glob(source_path):
        shutil.copy(file, target_path)


#download npm modules
os.system("npm install --production")

#compile typescript
os.system("tsc")

#copy other resources
deploy("./src/views/*", "./build/views/")

#deploy express server
print("launching express server")
os.system("node ./build/main.js")