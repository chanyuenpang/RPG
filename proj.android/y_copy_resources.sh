
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
    python "$DIR/../release_code.py"
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