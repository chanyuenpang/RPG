LOCAL_PATH := $(call my-dir)
COMMOM_PATH := $(LOCAL_PATH)/../../../../VeeCommon

include $(CLEAR_VARS)
LOCAL_MODULE := app_shared

LOCAL_MODULE_FILENAME := libApp

LOCAL_SRC_FILES := classes/main.cpp \
                   ../../Classes/AppDelegate.cpp \
                   ../../../../VeeCommon/c++/Common/VeeEncrypt.cpp \
                   ../../../../VeeCommon/c++/Common/VeeCommon.cpp \
                   ../../../../VeeCommon/c++/Common/VeeRequest.cpp \
                   ../../../../VeeCommon/c++/Common/VeeAction.cpp \
                   ../../../../VeeCommon/c++/Common/jsb_vee_common.cpp \
                   ../../../../VeeCommon/platform/android/CommonPlatForm.cpp \
                   ../../../../VeeCommon/c++/Common/crypto/CCCrypto.cpp \
                   ../../../../VeeCommon/c++/Common/crypto/CryptoHelper.cpp \
                   ../../../../VeeCommon/c++/Common/crypto/base64/libb64.c \
                   ../../../../VeeCommon/c++/Common/crypto/sha1/sha1.cpp \
                   ../../../../VeeCommon/c++/Common/JSON/CCJSONConverter.cpp \
                   ../../../../VeeCommon/c++/Common/JSON/cJSON/cJSON.c \


LOCAL_C_INCLUDES := $(LOCAL_PATH)
LOCAL_C_INCLUDES := $(LOCAL_PATH)/classes
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../Classes
LOCAL_C_INCLUDES += $(COMMOM_PATH)/platform/android \
                    $(COMMOM_PATH)/c++/Common \
                    $(COMMOM_PATH)/c++/Common/crypto \
                    $(COMMOM_PATH)/c++/Common/crypto/base64 \
                    $(COMMOM_PATH)/c++/Common/crypto/sha1 \
                    $(COMMOM_PATH)/c++/Common/JSON \
                    $(COMMOM_PATH)/c++/Common/JSON/cJSON

LOCAL_EXPORT_C_INCLUDES := $(COMMOM_PATH)/platform/android \
                            $(COMMOM_PATH)/c++/Common \
                            $(COMMOM_PATH)/c++/Common/crypto \
                            $(COMMOM_PATH)/c++/Common/crypto/base64 \
                            $(COMMOM_PATH)/c++/Common/crypto/sha1 \
                            $(COMMOM_PATH)/c++/Common/JSON \
                            $(COMMOM_PATH)/c++/Common/JSON/cJSON

LOCAL_WHOLE_STATIC_LIBRARIES := cocos2dx_static
LOCAL_WHOLE_STATIC_LIBRARIES += cocosdenshion_static
#LOCAL_WHOLE_STATIC_LIBRARIES += chipmunk_static
LOCAL_WHOLE_STATIC_LIBRARIES += spidermonkey_static
LOCAL_WHOLE_STATIC_LIBRARIES += scriptingcore-spidermonkey
LOCAL_WHOLE_STATIC_LIBRARIES += PluginBindingStatic

LOCAL_EXPORT_CFLAGS := -DCOCOS2D_DEBUG=0 -DCOCOS2D_JAVASCRIPT
#LOCAL_EXPORT_CFLAGS := -DCOCOS2D_DEBUG=2 -DCOCOS2D_JAVASCRIPT

include $(BUILD_SHARED_LIBRARY)

$(call import-module,cocos2dx)
$(call import-module,CocosDenshion/android)
#$(call import-module,external/chipmunk)
$(call import-module,scripting/javascript/spidermonkey-android)
$(call import-module,scripting/javascript/bindings)
$(call import-module,plugin/jsbindings)