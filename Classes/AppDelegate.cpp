#include "AppDelegate.h"

#include <vector>
#include <string>

#include "cocos2d.h"
#include "SimpleAudioEngine.h"
#include "generated/jsb_cocos2dx_auto.hpp"
#include "generated/jsb_cocos2dx_extension_auto.hpp"
#include "jsb_cocos2dx_extension_manual.h"
#include "cocos2d_specifics.hpp"
#include "js_bindings_ccbreader.h"
#include "js_bindings_system_registration.h"
#include "jsb_pluginx_protocols_auto.hpp"
#include "jsb_pluginx_extension_registration.h"
#include "jsb_opengl_registration.h"
#include "jsb_vee_common.hpp"

#include "VeeApi.h"
#include "VeeCommon.h"

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
#define CC_SKIP_COCOSTUDIO 1
#else
#define CC_SKIP_COCOSTUDIO 0
#endif

#include "cocos-ext.h"

//#define DEBUG 1
//#define COCOS2D_DEBUG 1

USING_NS_CC;
USING_NS_CC_EXT;
using namespace CocosDenshion;
using namespace std;

AppDelegate::AppDelegate()
{
}

AppDelegate::~AppDelegate()
{
    CCScriptEngineManager::purgeSharedManager();
}

bool AppDelegate::applicationDidFinishLaunching()
{
    // initialize director
    CCDirector *pDirector = CCDirector::sharedDirector();
    pDirector->setOpenGLView(CCEGLView::sharedOpenGLView());
    pDirector->setProjection(kCCDirectorProjection2D);

    CCSize winSize = pDirector->getWinSize();
    float rW = winSize.width/640;
    float rH = winSize.height/960;
    int wDes, hDes, pDes;
    if (rW >= rH) {
        pDes = kResolutionFixedHeight;
        wDes = winSize.width;
        hDes = 960;
    } else {
        pDes = kResolutionFixedWidth;
        wDes = 640;
        hDes = winSize.height;
    }
    CCEGLView::sharedOpenGLView()->setDesignResolutionSize(wDes, hDes, (ResolutionPolicy)pDes) ;
    CCBReader::setResolutionScale(1);

    CCFileUtils* fileutils = CCFileUtils::sharedFileUtils();
	std::vector<std::string> paths = fileutils->getSearchPaths();
    paths.insert(paths.begin(), "code_output");
    paths.insert(paths.begin(), "res_output");
	paths.insert(paths.begin(), fileutils->getWritablePath());
    fileutils->setSearchPaths(paths);

    // turn on display FPS
    pDirector->setDisplayStats(true);

    // set FPS. the default value is 1.0/60 if you don't call this
    pDirector->setAnimationInterval(1.0 / 60);

    ScriptingCore* sc = ScriptingCore::getInstance();
    sc->addRegisterCallback(register_all_cocos2dx);
    sc->addRegisterCallback(register_all_cocos2dx_extension);
    sc->addRegisterCallback(register_cocos2dx_js_extensions);
    sc->addRegisterCallback(register_all_cocos2dx_extension_manual);
    sc->addRegisterCallback(register_CCBuilderReader);
    sc->addRegisterCallback(jsb_register_system);
    sc->addRegisterCallback(JSB_register_opengl);
    sc->addRegisterCallback(register_all_veewo_extension);
    sc->addRegisterCallback(register_all_pluginx_protocols);
    sc->addRegisterCallback(register_pluginx_js_extensions);


    sc->start();

#if defined JSB_ENABLE_DEBUGGER
    sc->enableDebugger();   // Enable debugger here
#endif
    js_log("RUNNING Main");
    CCScriptEngineProtocol *pEngine = ScriptingCore::getInstance();
    CCScriptEngineManager::sharedManager()->setScriptEngine(pEngine);
    ScriptingCore::getInstance()->runScript("main.debug.js");
    return true;
}

void handle_signal(int signal) {
    static int internal_state = 0;
    ScriptingCore* sc = ScriptingCore::getInstance();
    // should start everything back
    CCDirector* director = CCDirector::sharedDirector();
    if (director->getRunningScene()) {
        director->popToRootScene();
    } else {

    }
}

// This function will be called when the app is inactive. When comes a phone call,it's be invoked too
void AppDelegate::applicationDidEnterBackground()
{
    CCDirector::sharedDirector()->stopAnimation();
    VeeCommon::CallJSFunc("onApplicationDidEnterBackground");
}

// this function will be called when the app is active again
void AppDelegate::applicationWillEnterForeground()
{
    CCDirector::sharedDirector()->startAnimation();
    VeeCommon::CallJSFunc("onApplicationWillEnterForeground");
}
