
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# ... use paths relative to current directory
COCOS2DX_ROOT="$DIR/../../.."
APP_ROOT="$DIR"
CODE_OUTPUT_DIR="$DIR/code_output"

BINDINGS_JS_ROOT="$APP_ROOT/../../../scripting/javascript/bindings/js"

# make sure assets is exist
if [ -d $CODE_OUTPUT_DIR ]; then
    rm -rf $CODE_OUTPUT_DIR
fi

mkdir $CODE_OUTPUT_DIR
VEE_DIR="$DIR/../../VeeCommon/js/common"
find $VEE_DIR -type f -exec cp {} $CODE_OUTPUT_DIR \;
# copy bindings/*.js into assets' root
cp -f "$BINDINGS_JS_ROOT"/*.js $CODE_OUTPUT_DIR
cp -f "$DIR/code"/*.js $CODE_OUTPUT_DIR