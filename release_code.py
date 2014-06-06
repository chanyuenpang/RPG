#!/usr/bin/python
import os
import subprocess
import shutil
def joinPath(path1, path2):
    return os.path.abspath(os.path.join(path1, path2))

def refreshDir(path):
    if os.path.isdir(path):
        shutil.rmtree(path)
        os.mkdir(path)
    else:
        os.mkdir(path)

def rmDir(path):
    if os.path.isdir(path):
        shutil.rmtree(path)
def copyFiles(srcArray, destDir):
    for src in srcArray:
        for file in os.listdir(src):
            path = joinPath(src, file)
            if os.path.isfile(path):
                dst = joinPath(destDir, file)
                shutil.copyfile(path, dst)

CURDIR = os.path.dirname(os.path.abspath(__file__))
CODEDIR = joinPath(CURDIR, "code")
OUTPUTDIR = joinPath(CURDIR, "code_output")

SCRIPT_PATH = joinPath(CURDIR, "../../../tools/cocos2d-console/console/cocos2d.py")

JSB_PATH = joinPath(CURDIR, "../../../scripting/javascript/bindings/js/")
VEE_PATH = joinPath(CURDIR, "../../VeeCommon/js/common/")
TMP_PATH = joinPath(CURDIR, "tmp")


refreshDir(TMP_PATH)
copyFiles([JSB_PATH, VEE_PATH], TMP_PATH)

refreshDir(OUTPUTDIR)
subprocess.call([SCRIPT_PATH, "jscompile", "-s", CODEDIR, "-d", OUTPUTDIR])
subprocess.call([SCRIPT_PATH, "jscompile", "-s", TMP_PATH, "-d", OUTPUTDIR])
rmDir(TMP_PATH)

