. ~/.bashrc
APPNAME="VeewoGame"

# options

buildexternalsfromsource=
PARALLEL_BUILD_FLAG=

usage(){
cat << EOF
usage: $0 [options]

Build C/C++ code for $APPNAME using Android NDK

OPTIONS:
-s	Build externals from source
-p  Run make with -j8 option to take advantage of multiple processors
-h	this help
EOF
}

while getopts "sph" OPTION; do
case "$OPTION" in
s)
buildexternalsfromsource=1
;;
p)
PARALLEL_BUILD_FLAG=\-j8
;;
h)
usage
exit 0
;;
esac
done

# exit this script if any commmand fails
set -e

# read local.properties

_LOCALPROPERTIES_FILE=$(dirname "$0")"/local.properties"
if [ -f "$_LOCALPROPERTIES_FILE" ]
then
    [ -r "$_LOCALPROPERTIES_FILE" ] || die "Fatal Error: $_LOCALPROPERTIES_FILE exists but is unreadable"

    # strip out entries with a "." because Bash cannot process variables with a "."
    _PROPERTIES=`sed '/\./d' "$_LOCALPROPERTIES_FILE"`
    for line in "$_PROPERTIES"; do
        declare "$line";
    done
fi

# paths

if [ -z "${NDK_ROOT+aaa}" ];then
echo "NDK_ROOT not defined. Please define NDK_ROOT in your environment or in local.properties"
exit 1
fi

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# ... use paths relative to current directory
COCOS2DX_ROOT="$DIR/../../../.."
APP_ROOT="$DIR/.."
APP_ANDROID_ROOT="$DIR"

BINDINGS_JS_ROOT="$APP_ROOT/../../../scripting/javascript/bindings/js"

echo
echo "Paths"
echo "    NDK_ROOT = $NDK_ROOT"
echo "    COCOS2DX_ROOT = $COCOS2DX_ROOT"
echo "    APP_ROOT = $APP_ROOT"
echo "    APP_ANDROID_ROOT = $APP_ANDROID_ROOT"
echo

# Debug
set -x

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# ... use paths relative to current directory
COCOS2DX_ROOT="$DIR/../../../.."
APP_ROOT="$DIR/.."
APP_ANDROID_ROOT="$DIR"

BINDINGS_JS_ROOT="$APP_ROOT/../../../scripting/javascript/bindings/js"

# make sure assets is exist
if [ -d "$APP_ANDROID_ROOT"/assets ]; then
    rm -rf "$APP_ANDROID_ROOT"/assets
fi

mkdir "$APP_ANDROID_ROOT"/assets
if [ x$1 = x"release" ]; then
    CODE_DIR="$DIR/../code_output"
else
    CODE_DIR="$DIR/../code"
    VEE_DIR="$DIR/../../../VeeCommon/js/common"
    find $VEE_DIR -type f -exec cp {} "$APP_ANDROID_ROOT"/assets \;
    # copy bindings/*.js into assets' root
    cp -f "$BINDINGS_JS_ROOT"/*.js "$APP_ANDROID_ROOT"/assets
fi

RESOURCE_DIR="$DIR/../Resources"
ICON_DIR="$DIR/../proj.ios/android_icon"
ANDROID_ICON_DIR="${DIR}/res/drawable"

find $CODE_DIR -type f -exec cp {} "$APP_ANDROID_ROOT"/assets \;
find $RESOURCE_DIR -type f -exec cp {} "$APP_ANDROID_ROOT"/assets \;

if [ -d "$APP_ANDROID_ROOT"/otherAssets ]; then
    find "$APP_ANDROID_ROOT"/otherAssets -type f -exec cp {} "$APP_ANDROID_ROOT"/assets \;
fi

cp -f "$ICON_DIR/a_icon-72.png" "${ANDROID_ICON_DIR}/icon.png"
cp -f "$ICON_DIR/a_icon-72.png" "${ANDROID_ICON_DIR}-hdpi/icon.png"
cp -f "$ICON_DIR/a_icon-30.png" "${ANDROID_ICON_DIR}-ldpi/icon.png"
cp -f "$ICON_DIR/a_icon-57.png" "${ANDROID_ICON_DIR}-mdpi/icon.png"
cp -f "$ICON_DIR/a_icon-96.png" "${ANDROID_ICON_DIR}-xhdpi/icon.png"
cp -f "$ICON_DIR/a_icon_512.png" "${ANDROID_ICON_DIR}-xxhdpi/icon.png"

echo "Using prebuilt externals"
echo

set -x

"$NDK_ROOT"/ndk-build $PARALLEL_BUILD_FLAG -C "$APP_ANDROID_ROOT" $* \
    "NDK_MODULE_PATH=${COCOS2DX_ROOT}:${COCOS2DX_ROOT}/cocos2dx/platform/third_party/android/prebuilt" \
    NDK_LOG=0 V=0
