/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
package com.veewo.triangle;

import android.content.Intent;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;

import com.umeng.socialize.bean.SHARE_MEDIA;
import com.umeng.socialize.bean.SocializeConfig;
import com.umeng.socialize.media.*;
import com.umeng.socialize.controller.*;

import com.umeng.update.UmengUpdateAgent;
import org.cocos2dx.lib.Cocos2dxActivity;
import android.content.Context;

import android.os.Bundle;
import org.cocos2dx.plugin.PluginWrapper;
import com.veewo.triangle.googleplay.GameHelper;

public class defaultAct extends Cocos2dxActivity implements GameHelper.GameHelperListener {
    private static defaultAct mActivity = null;
    // The game helper object. This class is mainly a wrapper around this object.
    protected GameHelper mGame;

    // Requested clients. By default, that's just the games client.
    protected int mRequestedClients = GameHelper.CLIENT_GAMES;

    // stores any additional scopes.
    private String[] mAdditionalScopes;

    protected String mDebugTag = "Java";
    private Context activity;

    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        mActivity = this;
        PluginWrapper.init(this); // for plugins
        initUMeng();

        mGame = new GameHelper(this);
        mGame.setup(this, mRequestedClients, mAdditionalScopes);
    }

    static {
        System.loadLibrary("App");
    }

    public defaultAct() {
        super();
        mGame = new GameHelper(this);
    }
    public defaultAct(int requestedClients) {
        super();
        setRequestedClients(requestedClients);
    }
    protected void setRequestedClients(int requestedClients, String ... additionalScopes) {
        mRequestedClients = requestedClients;
        mAdditionalScopes = additionalScopes;
    }
    protected void onStart() {
        super.onStart();
        mGame.onStart(this);
    }
    protected void onStop() {
        super.onStop();
        mGame.onStop();
    }
    public void onSignInFailed() {

    }
    public void onSignInSucceeded() {

    }

    public static void gameServicesSignIn() {
        mActivity.runOnUiThread(new Runnable() {
            public void run() {
                mActivity.mGame.beginUserInitiatedSignIn();
            }
        });
    }

    public static void send2GameCenter(int score, String leaderboardID) {
        if (!mActivity.mGame.isSignedIn()) return;
        mActivity.mGame.getGamesClient().submitScore(leaderboardID, score);
    }

    public static void updateAchievement(String id, int percentage) {
        if (!mActivity.mGame.isSignedIn()) return;
        mActivity.mGame.getGamesClient().incrementAchievement(id,percentage);
    }

    private static String mLeaderboardID = null;
    public static void showLeaderboards(String leaderboardID) {
        mLeaderboardID = leaderboardID;
        mActivity.runOnUiThread(new Runnable() {
            public void run() {
                if (!mActivity.mGame.isSignedIn()){
                    mActivity.mGame.beginUserInitiatedSignIn();
                }
                else mActivity.startActivityForResult(mActivity.mGame.getGamesClient().getAllLeaderboardsIntent(), 5001);
//                else mActivity.startActivityForResult(mActivity.mGame.getGamesClient().getLeaderboardIntent(mLeaderboardID), 5001);
            }
        });
    }

    public static void showAchievements() {
        mActivity.runOnUiThread(new Runnable() {
            public void run() {
                if (!mActivity.mGame.isSignedIn()){
                    mActivity.mGame.beginUserInitiatedSignIn();
                }
                else mActivity.startActivityForResult(mActivity.mGame.getGamesClient().getAchievementsIntent(), 5001);
            }
        });
    }


    // 为 UMeng 设置的成员变量
    private static Handler mHandler = null;
    private static UMSocialService mController = null;

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        mGame.onActivityResult(requestCode, resultCode, data);
        UMSsoHandler ssoHandler = mController.getConfig().getSsoHandler(requestCode) ;
        if(ssoHandler != null){
            ssoHandler.authorizeCallBack(requestCode, resultCode, data);
        }
    }

    private void addWXPlatform(String msg, String url) {
//        SocializeConfig config = mController.getConfig();
//
//        //支持微信
//        String appID = mActivity.getString(R.string.wx_appid);
//        String contentUrl = url;//mActivity.getString(R.string.app_url);
//
//        UMWXHandler wxHandler = config.supportWXPlatform(mActivity, appID, contentUrl);
//        wxHandler.setWXTitle(msg);
//
//        // 支持微信朋友圈
//        UMWXHandler circleHandler = config.supportWXCirclePlatform(mActivity, appID, contentUrl) ;
//        circleHandler.setCircleTitle(msg);
//
//        config.setPlatformOrder(SHARE_MEDIA.SMS, SHARE_MEDIA.WEIXIN, SHARE_MEDIA.WEIXIN_CIRCLE, SHARE_MEDIA.SINA);
//
//        mController.getConfig().registerListener(new SocializeListeners.SnsPostListener() {
//            @Override
//            public void onStart() {
//                Toast.makeText(mActivity, "正在分享", 0).show();
//            }
//            @Override
//            public void onComplete(SHARE_MEDIA platform, int eCode, SocializeEntity entity) {
//            }
//        });
    }

    static String Msg;
    static String Url;
    static void initUMeng(){
        // 支持 Umeng 自动更新
        UmengUpdateAgent.update(mActivity);

        String umeng_share = "com.umeng.share";
        mController = UMServiceFactory.getUMSocialService(umeng_share, RequestType.SOCIAL);
        SocializeConfig config = mController.getConfig();

        config.removePlatform(SHARE_MEDIA.RENREN, SHARE_MEDIA.DOUBAN, SHARE_MEDIA.TENCENT, SHARE_MEDIA.QZONE, SHARE_MEDIA.QQ);

//        config.setSsoHandler(new SinaSsoHandler());
//        config.setSsoHandler(new QZoneSsoHandler(mActivity));
//
//        config.supportAppPlatform(mActivity, SHARE_MEDIA.FACEBOOK, umeng_share, true);
//        UMFacebookHandler mFacebookHandler = new UMFacebookHandler(mActivity, UMFacebookHandler.PostType.PHOTO);
//        mFacebookHandler.addToSocialSDK();
        config.supportAppPlatform(mActivity, SHARE_MEDIA.TWITTER, umeng_share, true);
    }

    static void OpenShare(String msg, String imgPath, String url){
        // 设置分享图片，参数2为本地图片的资源引用
        // mController.setShareMedia(new UMImage(getActivity(), R.drawable.icon));
        // 设置分享图片，参数2为本地图片的路径(绝对路径)
        // mController.setShareMedia(new UMImage(getActivity(),
        // BitmapFactory109.decodeFile("/mnt/sdcard/icon.png")));

        Msg = msg;
        Url = url;
        UMImage img = (imgPath == null ? new UMImage(mActivity, R.drawable.icon) : new UMImage(mActivity, imgPath));
//        mController.setShareContent(msg + "( " + url + " )");
        mController.setShareMedia(img);

        mHandler = new Handler(Looper.getMainLooper());
        mHandler.postDelayed(new Runnable() {
            public void run() {
                if (mActivity != null) {
                    mActivity.addWXPlatform(Msg, Url);
                    mController.openShare(mActivity, false);
                }
            }
        }, 100);
    }

    static void openUrl(String url)
    {
        Uri uri = Uri.parse(url);
        Intent it = new Intent(Intent.ACTION_VIEW,uri);
        mActivity.startActivity(it);
        it = null;
    }
}
