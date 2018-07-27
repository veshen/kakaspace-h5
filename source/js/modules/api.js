/**
 * Created by peiyuanwu_sagreen on 2016/12/20.
 */
import 'whatwg-fetch';
//base

// var baseUrl='http://139.224.57.108/';   //本地测试
//var baseUrl='http://test.sa-green.cn/';
//var baseUrl='/';     //线上


//add cookie queryString
// var sger = 'sger='+encodeURIComponent('hV+Ui0WOiRLsq4pJUTTCqJCcb0Q5hGAHehTyWozkfJxhwI7Q1kS7hZxRj5Sz9ok+') + '&_=' + new Date().getTime();  //本地测试
//var sger = 'sger='+encodeURIComponent('w0fyh2hg_tymlOTl0msq46sIwFiyfIt0vRkOcQlNXr3R24iFZPPy0gh9sD6Xmw9_kNA2OoO8eBWawSw-0J2MyA') + '&_=' + new Date().getTime();
//var sger = '_=' + new Date().getTime();  //线上
const host = 'https://kt.sa-green.cn'

var baseUrl;
var sger;
var type = location.hostname
console.log(type)
switch(type){
    case '127.0.0.1':
    baseUrl = 'https://kt.sa-green.cn/';
    // baseUrl = 'http://139.224.57.108/';
    sger = '&_=' + new Date().getTime();  //本地测试
    // sger = 'sger='+encodeURIComponent('FFPzqfYIMrS_TODLDAlE6IRVXjv87QqqIabxHBa_nN2syBe0Rp5TQEbt5KKXHIW_YiOSp3EN0gLhr4Lu01ThDA') + '&_=' + new Date().getTime();  //本地测试
    break;
    case 'kt.sa-green.cn':
    baseUrl = 'https://kt.sa-green.cn/';
    sger = '_=' + new Date().getTime();  //线上
    break;
    case 'kk.sa-green.cn':
    baseUrl = '/';
    sger = '_=' + new Date().getTime();  //线上
    break;
}


var url={
    //秒杀
    'secondKillInfo':'event/eventinfo/recentEventInfo',
    //秒杀加入队列
    'secondKillAction':'eventseckill/snapup/action',
    //秒杀结果
    'secondKillResult':'eventseckill/snapup/loadResult?eventSerialId={eventSerialId}',
    //配送时间
    'supporttime':'logistics/deliver/supporttime?cityId={cityId}',
    //下单成功页
    'orderRedPackage':'marketing/redpackage/orderRedPackage/{orderId}',
    //详情页
    'skuDetail':'product/detail/{productId}',
    //轻体订单详情页
    'planOrderDetail':'weightlostplan/order/detail/{planOrderId}',
    //轻体计划轮播
    'recentPlanUserInfo':'weightlostplan/plan/diy/recentParticipateUserInfo',
    //轻体计划自由选择菜品列表
    'queryAvailableSku':'weightlostplan/plan/diy/queryAvailableSku',
    //轻体计划选择菜品
    'planDiyProduct':'weightlostplan/plan/diy/recommend',
    //轻体计划自由选择时间控件
    'calendarInfo':'weightlostplan/plan/diy/calendarInfo?cityId={cityId}&planCode={planCode}',
    //移除红点
    'removeRedDot':'usertouch/reddot/removeRedDot?nodeKey={nodeKey}',
    'fetchRedDots':'usertouch/reddot/fetchRedDots?nodeKey={nodeKey}',
    //充值人员列表
    'recentParticipateUserInfo':'balancetopup/users/recentParticipateUserInfo',
    //轻体计划入口页
    'allPlans':'weightlostplan/main/allPlans',

    //余额明细列表
    'userbalanceFlows':'userbalance/flows/{page}',

    //获取我的信息
    'userInfo':'user/myhome/userInfo',

    //充值规则
    'loadCopy':'cms/viewcopy/loadCopy?copyKey={copyKey}',


    'withDrawRequestDetail':'userbalance/withdraw/withDrawRequestDetail?requestSerialId={requestSerialId}',//可提现账单详情
    'withDrawInfo':'userbalance/withdraw/withDrawInfo',//可提现用户填写基本信息
    'submitWithDraw':'userbalance/withdraw/submitWithDraw',//提现提交
    'withdrawBalance':'userbalance/withdrawBalance',//可提现接口
    'flowslist':'userbalance/withdrawBalance/flows?lastId={lastId}&pageSize={pageSize}',//提现接口列表
    'sensorData':'log/sensorData/sensorUserId',//神策接口
    'wechatConfig': 'wechat/getJsApiConfPara/',//微信config
    'subscribeInfo':'userwechat/subscribeInfo',//当前用户是否已关注
    //newyear2017
    'newYear2017statisticsInfo':'gift/giftStatisticsInfo',//newyear2017 获取新年活动统计信息

    //产品列表
    'productList': 'product/main',
    //加入站点产品列表
    'newproductList': 'product/arrivetoday/productWithStock?latitude={latitude}&longitude={longitude}&siteId={siteId}',

    //用户基本信息
    'userBaseInfo': 'user/baseInfo',

    //用户详细信息
    'userDetailInfo': 'user/detailInfo',

    //酱料选择
    'sauceList': 'product/{productId}/specifications',

    //获取用户基本信息
    'baseInfo':'user/baseInfo',

    //获取用户邀请码
    'inviteCode':'user/invite/getInviteCode',

    //获取分享二维码
    'paperInfo':'userwechat/paperInfo?inviteCode={inviteCode}',

    //address
    'addressAll':'logistics/address/all',

    //添加地址
    'addAddress':'logistics/address/add',

    //skuInfo
    'skuInfo':'product/extendInfo/{productId}/{productType}/{key}',

    //Plan
    //获取套餐默认信息
    'PlanDefaultInfo':'weightlostplan/plan/planDefaultRecommendDetail?cityId={cityId}&planCode={planCode}',
    //获取轻体计划价格信息
    'PlanDefaultPriceInfo':'weightlostplan/plan/planPrice?planCode={planCode}',

    //查看最近购买轻体计划的用户信息
    'PlanParticipateUserInfo':'weightlostplan/order/recentParticipateUserInfo',

    //查看最近购买的轻体计划
    'PlanOrderList':'weightlostplan/order/recentSimplePlanOrderList',

    //轻体订单进度查看
    'PlanProgress':'weightlostplan/order/planProgress/{planOrderId}',

    //根据订单号获取类型
    'PlanInfoByPlanOrderId':'weightlostplan/order/fetchPlanInfoByPlanOrderId/{planOrderId}',

    //store
    //门店购买
    'storeProductList':'product/dinnein/allProducts?siteId={siteId}',

    //获取沙拉基本信息
    'multiProductInfo': 'product/baseInfo/{productIds}',

    //获取酱料基本信息
    'multiSauceInfo': 'specification/option/{productIds}',

    //获取用户余额信息
    'currentBalanceInfo':'userbalance/currentBalance',

    //获取自动选中优惠券
    'bestCoupon': 'order/fetchBestCoupon',

    //订单价格查询
    'calculateOrderPrice': 'order/calculatePrice',

    //小食列表
    'snackList':'product/snack',

    //小食标签标题
    'snackTitle':'product/snackTitle',

    //创建订单
    'orderCreate': 'order/add',

    //发送验证码
    'sendVerifyCode': 'verifyCode/send',

    //绑定手机号
    'bindMobile': 'user/bindMobile',

    //实体店订单取餐号
    'orderSiteSerial':'order/siteserial/serialNumber/{orderId}',

    //订单详情
    'orderDetail': 'order/detail/{orderId}',

    //取消订单
    'cancelOrder': 'order/cancel/{orderId}',

    //取消已支付订单
    'cancelPayOrder':'order/userRefund',

    //修改订单
    'changeDeliveryInfo':'order/changeDeliveryInfo',

    //获取微信支付pre-payid
    'orderPrepay':'pay/query/prepay/{orderId}',

    //获取微信轻体支付pre-payid
    'planorderPrepay':'pay/wechat/prePayInfo/{planOrderId}',

    //套餐最优券
    'planBestCoupon':'weightlostplan/order/fetchBestCoupon',

    //套餐所有券
    'planCoupon':'weightlostplan/order/fetchAvailableCouponForOrder',

    //判断产品是否售卖product/sellable/1,2
    'productSellable':'product/sellable/',

    //获取结算信息
    'getSettlementInfo':'order/settlement',

    //订单结算计算价格接口 （新）
    'calculatePriceWithFetchBestCoupon' : 'order/calculatePriceWithFetchBestCoupon',

    //可用优惠券列表
    'couponForUserList': 'order/fetchCouponForUse',

    //兑换优惠券
    'redeemCoupon' : 'marketing/redeemCoupon/exchange/',

    //获取优惠券列表
    'getCouponList' : 'marketing/user/unionCoupon/paginationUserCoupon',

    //获取可用优惠券数量
    'getCouponCount' : 'marketing/user/unionCoupon/userAvailableCouponCount',

    //酱料选择
    'sauceList': 'product/{productId}/specifications',

    //获取充值方案
    'getBalancetopup' : 'balancetopup/plan/availablePlans',

    //发起充值
    'rechargeAction' : 'balancetopup/order/topUpAction',

    //获取推荐模块列表
    'getRecommendProducts' : 'product/recommendProducts',

    //获取用户订单
    "getUserOrder" : 'order/my/list',

    //获取轻体计划订单价格
    'planOrderPrice':'weightlostplan/order/calculateOrderPrice',

    //创建轻体计划订单
    'planCreateOrder':'weightlostplan/order/submitPlanOrder',

    //获取生成二维码的Token
    'generateToken' : 'user/token/generateToken',

    //轮询支付结果
    'queryPayResult' : 'store/cashier/preorder/queryByPaymentSerialId',

    //根据经纬度获取站点
    'arriveToday':'arrivetoday/site/assignSite',

    //获取广告信息
    'fetchAds':'ad/access/fetchAds',

    //获取首页sku列表
    'getIndexProductList' : 'product/mainV2/productList',

    //根据经纬度获取配送地址
    'nearAddress':'logistics/address/findClosetAddressFromLocation',

    //获取首页弹层
    'getNotification':'usertouch/mainpage/fetchNotification',

    //已读通知
    'maskAsRead':'usertouch/mainpage/maskAsRead',

    //弹层获取优惠券
    'fetchCoupon' : 'marketing/takeCoupon',

    //删除地址
    'removeAddress': 'logistics/address/remove/{addressId}',

    //设定默认地址
    'setDefaultAddress': 'logistics/address/setdefault/{addressId}',

    //获取已领取红包列表
    'getGrabList' : 'marketing/redpackage/grabList/{serialId}',

    //获取当前红包状态判断是否已领取
    'redPacketMyGrab':'marketing/redpackage/myGrabResult/{serialId}',

    //判断是否新用户
    'redPacketNewUser':'marketing/redpackage/newUserForRedPackage',

    //老用户领取红包
    redPacketGrab:'marketing/redpackage/grab/{serialId}',

    //新用户领取红包
    redPacketUserGrab:'marketing/redpackage/newUserGrab/{serialId}',

    //获取新人优惠券展示方案
    'newUserRedPackageStrategy':'marketing/redpackage/newUserRedPackageStrategy',

    //验证地址
    'checkAddress' : 'logistics/address/regeoLocation',

    //获取地址详细信息
    'getAddressInfo' : 'logistics/address/get/{addressId}',

    //获取冰箱SKU列表
    'getIceWorldList' : 'product/dinnein/allProductsForFreezer',
    //搜索地址
    'currentPoiOptions':'logistics/location/currentPoiOptions?latitude={latitude}&longitude={longitude}',

    //查询
    'searchPoi':'logistics/location/searchPoi?city={city}&keywords={keywords}',

    /*周年活动*/
    //获取用户卡片列表
    'getUserCardList' : 'event/collection/pieceInfo',
    //获取签到卡片
    'getSignCard' : 'event/collection/daily/checking',
    //获取某个卡片的ID[用户分享]?pieceCode=ALL_BEAUTY
    'fetchPieceSerialId':'event/collection/share/fetchPieceSerialId',
    //分享完成后，调用接口?serialId=d8744349fc88b3f65266ac7c1bd716df
    'pieceShared':'event/collection/share/pieceShared',
    //领取分享卡片?serialId=d8744349fc88b3f65266ac7c1bd716df
    'grabPiece':'event/collection/share/grabPiece',
    //获取赠送/领取记录
    'giveRecordList':'event/collection/sharereceord/giveRecord',
    //好友动态
    'friendsUpdates':'event/collection/sharereceord/friendsUpdates',
    //直接赠送给好友
    'givePieceToFriends':'event/collection/share/givePieceToFriends',
    // 兑换成功用户信息
    'recentConsumeUserInfo':'event/collection/exchange/recentConsumeUserInfo',
    //兑换奖品
    'exchangeGift' : 'event/collection/exchange/exchange',
    //参与活动人数
    'participationNumber':'event/collection/sharereceord/participationNumber',
    //根据订单号查询轻体周年卡
    'pieceInfoListByPlanOrderId':'event/collection/pieceInfoListByPlanOrderId',
    //根据订单号查询普通订单周年卡
    'pieceInfoListByOrderId':'event/collection/pieceInfoListByOrderId',
    //获取红包弹层
    'redNotification':'usertouch/mainpage/fetchNotification?scenarioCode={scenarioCode}&scenarioBizId={scenarioBizId}',
    //获取红包分享
    'newredPackageInfo':'marketing/redpackage/redPackageInfo/{serialId}',
    //根据轻体订单获取红包信息
    'planOrderRedPackage':'marketing/redpackage/planOrderRedPackage/{serialId}',
    //轻体订单已支付取消订单
    'refundPaidPlanOrder':'weightlostplan/order/refundPaidPlanOrder/{planOrderId}',
    //轻体订单未支付取消订单
    'cancelUnpaidPlanOrder':'weightlostplan/order/cancelUnpaidPlanOrder/{planOrderId}',
    // 获取秒杀订阅状态
    'getSecondKillStatus' : 'event/seckill/subscribe/status',
    //设置秒杀订阅状态
    'setSecondKillStatus' : 'event/seckill/subscribe/action',
    // 新堂食页获取菜品接口
    'getStoreProductListNew':'product/dinnein/productListV2',
    //沙小绿生成红包
    'markRedPacket':"marketing/shaxiaolv/redpackage/create",
    //沙小绿红包规则
    'loadGroups':'marketing/shaxiaolv/redpackage/loadGroups',
    //秒杀获取红包
    'fetchEncourageCoupon':'marketing/seckill/fetchEncourageCoupon',
    //查询结算商品详情
    'fetchProductSettlementInfo':'product/settlement/settlementInfo/{productId}',
    //创建送礼订单
    'createGiftOrder':'gift/createGift/createGiftOrder',
    //提交祝福语
    'addBlessingForPropose':'gift/addBlessingForPropose',
    //获取礼物状态
    'findGiftProposeByProposeCode':'gift/query/findGiftProposeByProposeCode/{proposeCode}',
    //提交收货信息 领取礼物
    'acceptGift':'gift/acceptGift/{proposeCode}',
    //获取秒杀订阅人数
    'getSubscribeNumber':'event/seckill/subscribe/subscribeNumber',
    //获取我的中奖状态
    'getMyEventPrizeInfo':'event/userprizeinfo/myEventPrizeInfo',
    //获取成长沙拉余额及成长沙拉详情
    'myGrowProperty':'property/userproperty/myGrowProperty',
    // 获取资产列表
    'mySkuProperty':'property/userproperty/mySkuProperty',
    // 获取成长沙拉流水
    'getMyWalletFlow':'property/userskuwallet/myWalletFlow',
    // 查询可兑换的沙拉信息
    'skuWalletAndExchangeList':'property/userproperty/exchange/skuWalletAndExchangeList',
    // 兑换沙拉
    'doExchange':'property/userproperty/exchange/doExchange',
    // 获取当前用户订阅信息：
    'getCurrentSubscribe':'weightlostplan/subscribe/currentSubscribe',
    // 更新订阅信息：
    'updateCurrentSubscribe':'weightlostplan/subscribe/action',
    // 获取首页底部配置
    'getSomeConfig':'cms/baseconfig/loadConfig',
    // 获取Vip
    'gitUserMemberInfo':'member/info/userMemberInfo',
    // 获取Vip充值类目
    'gitAvailableStrategy':'member/strategy/availableStrategy',
    // 创建会员支付订单
    'createMemberOrder':'member/order/createMemberOrder',
    // 取消未支付的会员订单
    'cancelUnpaidMemberOrder':'member/order/cancelUnpaidMemberOrder',
    // 验证用户是否是会员
    'checkMember':'member/info/checkMember',
    // 我的页面接口
    'myUserInfoV2':'user/myhome/myUserInfoV2',
    // 获取商品详情接口
    'detailV2':'product/detailV2',
    //严选活动信息
    'loadTopicInfo':'product/topic/loadTopicInfo',
    //严选商城
    'getAllAvailable':'product/topic/allAvailable',
    // 轻体DIY快速配餐
    'planQuk' : 'weightlostplan/plan/diy/diyQuickSelect',
    // 新领红包接口
    'getRedPacketData' : 'marketing/redpackage/paginationGrabList',

    //临时退款
    'refundOrder' : 'orderDirty/operation/refundOrder',


    //kakaspace=============================>
    'queryOrderDetail':'order/orderDetail',
    'confirmOrder':'order/confirmOrder'

};


//obj
var api={};



// kakaspace =======================>
// 提交订单
api.confirmOrder = function(data){
    let _url = markUrl(url.confirmOrder,data);
    return _get(baseUrl+_url);
}


// 查询订单详情
api.queryOrderDetail = function(data){
    let _url = markUrl(url.queryOrderDetail,data);
    return _get(baseUrl+_url);
}



// 新领红包接口
api.refundOrder = function(data){
    let _url = markUrl(url.refundOrder,data);
    return _get(baseUrl+_url);
}

// 新领红包接口
api.getRedPacketData = function(data){
    let _url = markUrl(url.getRedPacketData,data);
    return _get(baseUrl+_url);
}

//轻体DIY快速配餐
api.planQuk=function(data){
    return _post(baseUrl+url.planQuk,data);
};

// 严选商城
api.getAllAvailable = function(data){
    let _url = markUrl(url.getAllAvailable,data);
    return _get(baseUrl+_url);
}

// 获取商品详情接口
api.loadTopicInfo = function(data){
    let _url = markUrl(url.loadTopicInfo,data);
    return _get(baseUrl+_url);
}

// 获取商品详情接口
api.detailV2 = function(data){
    let _url = markUrl(url.detailV2,data);
    return _get(baseUrl+_url);
}

// 我的页面接口
api.myUserInfoV2 = function(){
    return _get(baseUrl+url.myUserInfoV2);
}

// 验证用户是否是会员
api.checkMember = function(){
    return _get(baseUrl+url.checkMember);
}

// 取消未支付的会员订单
api.cancelUnpaidMemberOrder = function(data){
    let _url = markUrl(url.cancelUnpaidMemberOrder,data);
    return _get(baseUrl+_url);
}

//创建会员支付订单
api.createMemberOrder=function(data){
    return _post(baseUrl+url.createMemberOrder,data);
};

// 获取Vip充值类目
api.gitAvailableStrategy = function(){
    let _url = markUrl(url.gitAvailableStrategy);
    return _get(baseUrl+_url);
}

// 获取Vip
api.gitUserMemberInfo = function(){
    let _url = markUrl(url.gitUserMemberInfo);
    return _get(baseUrl+_url);
}

// 获取首页底部配置
api.getSomeConfig = function(data){
    let _url = markUrl(url.getSomeConfig,data);
    return _get(baseUrl+_url);
}


// 更新订阅信息：
api.updateCurrentSubscribe = function(data){
    let _url = markUrl(url.updateCurrentSubscribe,data);
    return _get(baseUrl+_url);
}

//获取当前用户订阅信息：
api.getCurrentSubscribe=function(){
    return _get(baseUrl+url.getCurrentSubscribe);
};

//兑换沙拉
api.doExchange=function(data){
    return _post(baseUrl+url.doExchange,data);
};


//查询可兑换的沙拉信息
api.skuWalletAndExchangeList=function(){
    return _get(baseUrl+url.skuWalletAndExchangeList);
};

// 获取成长沙拉流水
api.getMyWalletFlow = function(data){
    let _url = markUrl(url.getMyWalletFlow,data);
    return _get(baseUrl+_url);
}

// 获取资产列表
api.mySkuProperty = function(data){
    let _url = markUrl(url.mySkuProperty,data);
    return _get(baseUrl+_url);
}

//获取礼物状态
api.myGrowProperty=function(urlParm){
    return _get(baseUrl+url.myGrowProperty);
};

//提交收货信息 领取礼物
api.acceptGift=function(urlParm,data){
    let _url=_urlMixPram(urlParm,url.acceptGift);
    return _post(baseUrl+_url,data);
};

//获取礼物状态
api.findGiftProposeByProposeCode=function(urlParm){
    let _url=_urlMixPram(urlParm,url.findGiftProposeByProposeCode);
    return _get(baseUrl+_url);
};

//提交祝福语
api.addBlessingForPropose=function(data){
    return _post(baseUrl+url.addBlessingForPropose,data);
};

//创建送礼订单
api.createGiftOrder=function(data){
    return _post(baseUrl+url.createGiftOrder,data);
};
// 获取我的中奖状态
api.getMyEventPrizeInfo = function(data){
    let _url = markUrl(url.getMyEventPrizeInfo,data);
    return _get(baseUrl+_url);
}
//获取秒杀订阅人数
api.getSubscribeNumber=function(){
    return _get(baseUrl+url.getSubscribeNumber);
};
//查询结算商品详情
api.fetchProductSettlementInfo=function(urlParm){
    let _url=_urlMixPram(urlParm,url.fetchProductSettlementInfo);
    return _get(baseUrl+_url);
};

// 沙小绿红包规则
api.loadGroups = function(){
    return _get(baseUrl+url.loadGroups);
}

//秒杀获取红包
api.fetchEncourageCoupon=function(data){
    let _url = markUrl(url.fetchEncourageCoupon,data);
    return _post(baseUrl+_url);
};

// 沙小绿生成红包
api.markRedPacket = function(data){
    let _url = markUrl(url.markRedPacket,data);
    return _get(baseUrl+_url);
}

// 新堂食页获取菜品接口
api.getStoreProductListNew = function(data){
    let _url = markUrl(url.getStoreProductListNew,data);
    return _get(baseUrl+_url);
}

// 获取秒杀订阅状态
api.getSecondKillStatus = function(){
    return _get(baseUrl+url.getSecondKillStatus);
}

// 设置秒杀订阅状态
api.setSecondKillStatus = function(data){
    let _url = markUrl(url.setSecondKillStatus,data);
    return _get(baseUrl+_url);
}

//秒杀加入队列
api.secondKillAction=function(data){
    return _post(baseUrl+url.secondKillAction,data);
};
//秒杀结果
api.getSecondKillResult=function(urlParm){
    let _url=_urlMixPram(urlParm,url.secondKillResult);
    return _get(baseUrl+_url);
};

//轻体订单已支付取消订单
api.getRefundPaidPlanOrder=function(urlParm){
    let _url=_urlMixPram(urlParm,url.refundPaidPlanOrder);
    return _get(baseUrl+_url);
};
//轻体订单未支付取消订单
api.getCancelUnpaidPlanOrder=function(urlParm){
    let _url=_urlMixPram(urlParm,url.cancelUnpaidPlanOrder);
    return _get(baseUrl+_url);
};

//轻体订单详情
api.getPlanOrderDetail=function(urlParm){
    let _url=_urlMixPram(urlParm,url.planOrderDetail);
    return _get(baseUrl+_url);
};
// 秒杀活动展示
api.getSecondKillInfo=function(urlParm){
    let _url=_urlMixPram(urlParm,url.secondKillInfo);

    return _get(baseUrl+_url);
};
// 获取红包弹层
api.getSupporttime=function(urlParm){
    let _url=_urlMixPram(urlParm,url.supporttime);
    return _get(baseUrl+_url);
};
// 根据轻体订单获取红包信息
api.planOrderRedPackage=function(urlParm){
    let _url=_urlMixPram(urlParm,url.planOrderRedPackage);
    return _get(baseUrl+_url);
};
// 获取红包弹层
api.getNewredPackageInfo=function(urlParm){
    let _url=_urlMixPram(urlParm,url.newredPackageInfo);
    return _get(baseUrl+_url);
};
// 获取红包弹层
api.getredNotification=function(urlParm){
    let _url=_urlMixPram(urlParm,url.redNotification);
    return _get(baseUrl+_url);
};
// 根据订单号查询普通订单周年卡
api.pieceInfoListByOrderId = function(data){
    let _url = markUrl(url.pieceInfoListByOrderId,data);
    return _get(baseUrl+_url);
}
// 根据订单号查询轻体周年卡
api.pieceInfoByPlanOrderId = function(data){
    let _url = markUrl(url.pieceInfoListByPlanOrderId,data);
    return _get(baseUrl+_url);
}
//参与活动人数
api.participationNumber = function(){
    return _get(baseUrl+url.participationNumber);
};

//兑换奖品
api.exchangeGift=function(data){
    return _post(baseUrl+url.exchangeGift,data);
};

//兑换成功用户信息
api.recentConsumeUserInfo = function(){
    return _get(baseUrl+url.recentConsumeUserInfo);
};
// 直接赠送给好友
api.givePieceToFriends = function(data){
    let _url = markUrl(url.givePieceToFriends,data);
    return _get(baseUrl+_url);
}

// 好友动态
api.friendsUpdates = function(data){
    let _url = markUrl(url.friendsUpdates,data);
    return _get(baseUrl+_url);
}

//获取赠送/领取记录
api.giveRecordList = function(data){
    let _url = markUrl(url.giveRecordList,data);
    return _get(baseUrl+_url);
}

//领取分享卡片
api.grabPiece = function(data){
    let _url = markUrl(url.grabPiece,data);
    return _get(baseUrl+_url);
}

//分享完成后，调用接口
api.pieceShared = function(data){
    let _url = markUrl(url.pieceShared,data);
    return _get(baseUrl+_url);
}

//获取某个卡片的ID[用户分享]
api.fetchPieceSerialId = function(data){
    let _url = markUrl(url.fetchPieceSerialId,data);
    return _get(baseUrl+_url);
}

//获取签到卡片
api.getSignCard = function(){
    return _get(baseUrl+url.getSignCard);
}

// 获取用户卡片列表
api.getUserCardList = function(data){
    let _url = markUrl(url.getUserCardList,data);
    return _get(baseUrl+_url);
}

//查询地址
api.getSearchPoi=function(urlParm){
    let _url=_urlMixPram(urlParm,url.searchPoi);
    return _get(baseUrl+_url);
};

//搜索地址
api.getCurrentPoiOptions=function(urlParm){
    let _url=_urlMixPram(urlParm,url.currentPoiOptions);
    return _get(baseUrl+_url);
};

// 获取下单成功
api.getOrderRedPackage=function(urlParm){
    let _url=_urlMixPram(urlParm,url.orderRedPackage);
    return _get(baseUrl+_url);
};

// 获取冰箱SKU列表
api.getIceWorldList = function(data){
    let _url = markUrl(url.getIceWorldList,data);
    return _get(baseUrl+_url);
}

//获取地址详细信息
api.getAddressInfo=function(data){
    let _url=_urlMixPram(data,url.getAddressInfo);
    return _get(baseUrl+_url);
};

//验证地址
api.checkAddress=function(data){
    let _url = markUrl(url.checkAddress,data);
    return _get(baseUrl+_url);
};


//添加地址
api.addAddress=function(data){
    return _post(baseUrl+url.addAddress,data);
};

//设定默认地址
api.setDefaultAddress=function(data){
    let _url=_urlMixPram(data,url.setDefaultAddress);
    return _post(baseUrl+_url);
};

//删除地址
api.removeAddress=function(data){
    let _url=_urlMixPram(data,url.removeAddress);
    return _post(baseUrl+_url);
};

//获取新人优惠券展示方案
api.newUserRedPackageStrategy=function(data){
    return _get(baseUrl+url.newUserRedPackageStrategy);
};

//新用户领取红包
api.redPacketUserGrab=function(urlParm){
    let _url=_urlMixPram(urlParm,url.redPacketUserGrab);
    return _post(baseUrl+_url);
};

//老用户领取红包
api.redPacketGrab=function(urlParm){
    let _url=_urlMixPram(urlParm,url.redPacketGrab);
    return _post(baseUrl+_url);
};

//判断是否新用户
api.redPacketNewUser=function(data){
    return _get(baseUrl+url.redPacketNewUser);
};

//获取当前红包状态判断是否已领取
api.redPacketMyGrab=function(urlParm){
    let _url=_urlMixPram(urlParm,url.redPacketMyGrab);
    return _get(baseUrl+_url);
};

//获取已领取红包列表
api.getGrabList=function(urlParm){
    let _url=_urlMixPram(urlParm,url.getGrabList);
    return _get(baseUrl+_url);
};

//弹层获取优惠券
api.fetchCoupon=function(data){
    let _url = markUrl(url.fetchCoupon,data);
    return _get(baseUrl+_url);
};

//已读通知
api.maskAsRead=function(data){
    let _url = markUrl(url.maskAsRead,data);
    return _get(baseUrl+_url);
};
//获取首页弹层
api.getNotification=function(data){
    return _get(baseUrl+url.getNotification);
};
//根据经纬度获取配送地址
api.getNearAddress=function(data){
    let _url = markUrl(url.nearAddress,data);
    return _get(baseUrl+_url);
};
//获取首页sku列表
api.getIndexProductList=function(data){
    let _url = markUrl(url.getIndexProductList,data);
    return _get(baseUrl+_url);
};
//获取广告信息
api.fetchAds=function(data){
    let _url = markUrl(url.fetchAds,data);
    return _get(baseUrl+_url);
};
//根据经纬度获取站点
api.getArriveToday=function(data){
    let _url = markUrl(url.arriveToday,data);
    return _get(baseUrl+_url);
};
api.getSkuDetail=function(urlParm){
    let _url=_urlMixPram(urlParm,url.skuDetail);
    return _get(baseUrl+_url);
};
//轻体计划自由选择人员定制
api.getRecentPlanUserInfo=function(){
    return _get(baseUrl+url.recentPlanUserInfo);
};
//轻体计划自由选择菜品列表
api.getQueryAvailableSku=function(data){
    return _post(baseUrl+url.queryAvailableSku,data);
};
//选择菜品页面
api.getPlanDiyProduct=function(data){
    return _post(baseUrl+url.planDiyProduct,data);
};
//轻体计划自由选择时间控件
api.getCalendarInfo=function(urlParm){
    let _url=_urlMixPram(urlParm,url.calendarInfo);
    return _get(baseUrl+_url);
};
//获取红点
api.getFetchRedDots=function(urlParm){
    let _url=_urlMixPram(urlParm,url.fetchRedDots);
    return _get(baseUrl+_url);
};
//移除红点
api.getRemoveRedDot=function(urlParm){
    let _url=_urlMixPram(urlParm,url.removeRedDot);
    return _get(baseUrl+_url);
}
//轮询支付结果
api.getQueryPayResult=function(data){
    let _url = markUrl(url.queryPayResult,data);
    return _get(baseUrl+_url);
};
//获取生成二维码的Token
api.getGenerateToken=function(data){
    let _url = markUrl(url.generateToken,data);
    return _get(baseUrl+_url);
};
//创建轻体计划订单
api.planCreateOrder=function(data){
    return _post(baseUrl+url.planCreateOrder,data);
};
//获取轻体计划订单价格
api.getPlanOrderPrice=function(data){
    return _post(baseUrl+url.planOrderPrice,data);
};
//获取最近充值人员信息
api.getRecentParticipateUserInfo=function(){
    return _get(baseUrl+url.recentParticipateUserInfo);
};
//轻体计划入口
api.getAllPlans=function(urlParm){
    let _url=_urlMixPram(urlParm,url.allPlans);
    return _get(baseUrl+_url);
};
//获取用户订单
api.getUserOrderList=function(data){
    let _url = markUrl(url.getUserOrder,data);
    return _get(baseUrl+_url);
};
//获取推荐模块列表
api.getRecommendProducts=function(data){
    return _post(baseUrl+url.getRecommendProducts,data);
};
//发起充值
api.getRechargeAction=function(data){
    return _post(baseUrl+url.rechargeAction,data);
};
//获取充值方案
api.getBalancetopup=function(urlParm){
    return _get(baseUrl+url.getBalancetopup);
};
//酱料选择
api.getProductSauce=function(urlParm){
    let _url=_urlMixPram(urlParm,url.sauceList);
    return _get(baseUrl+_url);
};
//余额明细
api.getUserBalanceFlows=function(urlParm){
    let _url=_urlMixPram(urlParm,url.userbalanceFlows);
    return _get(baseUrl+_url);
};
//获取我的信息
api.getMyUserInfo=function(){
    return _get(baseUrl+url.userInfo);
};
//充值规则
api.getLoadCopy=function(urlParm){
    let _url=_urlMixPram(urlParm,url.loadCopy);
    return _get(baseUrl+_url);
};
//获取可用优惠券数量
api.getCouponCount=function(){
    return _get(baseUrl+url.getCouponCount);
};
//获取优惠券列表
api.getCouponList=function(data){
    let _url = markUrl(url.getCouponList,data);
    return _get(baseUrl+_url);
};
//兑换优惠券
api.getRedeemCoupon=function(urlParm){
    return _post(baseUrl+url.redeemCoupon+urlParm.redeemCode);
};
//可用优惠券列表
api.getCouponForUserList=function(data){
    return _post(baseUrl+url.couponForUserList,data);
};
//订单结算计算价格接口
api.getOrdercalculatePrice=function(data){
    return _post(baseUrl+url.calculatePriceWithFetchBestCoupon,data);
};
//获取结算信息
api.getSettlementInfo=function(data){
    return _post(baseUrl+url.getSettlementInfo,data);
};
//判断产品是否售卖product/sellable/1,2
api.getSellable=function(data){
    return _get(baseUrl+url.productSellable+data);
};
//套餐所有券
api.getPlanCoupon=function(data){
    return _post(baseUrl+url.planCoupon,data);
};
//套餐最优券
api.getPlanBestCoupon=function(data){
    return _post(baseUrl+url.planBestCoupon,data);
};
//可提现账单详情
api.getWithDrawRequestDetail=function(urlParm){
    let _url=_urlMixPram(urlParm,url.withDrawRequestDetail);
    return _get(baseUrl+_url);
};
//可提现提交
api.getSubmitWithDraw=function(data){
    return _post(baseUrl+url.submitWithDraw,data);
};
//可提现获取用户信息
api.getWithDrawInfo=function(){
    return _get(baseUrl+url.withDrawInfo);
};
//可提现
api.getWithdrawBalance=function(){
    return _get(baseUrl+url.withdrawBalance);
};
//可提现列表
api.getFlowslist=function(urlParm){
    let _url=_urlMixPram(urlParm,url.flowslist);
    return _get(baseUrl+_url);
};
//获取神策
api.getSensorData=function(){
    return _get(baseUrl+url.sensorData);
};

//获取Sku列表
api.getProductList=function(){
    return _get(baseUrl+url.productList);
};
//new获取Sku列表
api.getNewproductList=function(urlParm){
    let _url=_urlMixPram(urlParm,url.newproductList);
    return _get(baseUrl+_url);
};

//酱料选择
api.getSauceList=function(urlParm){
    let _url=_urlMixPram(urlParm,url.sauceList);
    return _get(baseUrl+_url);
};

//获取用户信息
api.getUserBaseInfo=function(){
    return _get(baseUrl+url.userBaseInfo);
};

//用户详细信息
api.getUserDetailInfo=function(){
    return _get(baseUrl+url.userDetailInfo);
};


//获取WechatConfig
api.getWechatConfig=function(data){
    return _post(baseUrl+url.wechatConfig,data);
};

//获取subscribeInfo
api.getsubscribeInfo=function(){
    return _get(baseUrl+url.subscribeInfo);
};

//获取用户基本信息
api.getBaseInfo=function(){
    return _get(baseUrl+url.baseInfo);
};

//获取用户邀请码
api.getInviteCode=function(){
    return _get(baseUrl+url.inviteCode);
};

//获取分享二维码
api.getPaperInfo=function(urlParm){
    let _url=_urlMixPram(urlParm,url.paperInfo);
    return _get(baseUrl+_url);
};

//获取NewYear2017statisticsInfo
api.getNewYear2017statisticsInfo=function(){
    return _get(baseUrl+url.newYear2017statisticsInfo);
};

//address
api.getAddressAll=function(data){
    let _url = markUrl(url.addressAll,data);
    return _get(baseUrl+_url);
};

//sku
api.getSkuInfo=function(urlParm){
    let _url=_urlMixPram(urlParm,url.skuInfo);
    return _get(baseUrl+_url);
};


//Plan
//获取套餐默认信息
api.getPlanDefaultInfo=function(urlParm){
    let _url=_urlMixPram(urlParm,url.PlanDefaultInfo);
    return _get(baseUrl+_url);
};

//获取套餐价格信息
api.getPlanDefaultPriceInfo=function(urlParm){
    let _url=_urlMixPram(urlParm,url.PlanDefaultPriceInfo);
    return _get(baseUrl+_url);
};

//获取最近购买轻体计划的用户信息
api.getPlanParticipateUserInfo=function(){
    return _get(baseUrl+url.PlanParticipateUserInfo);
};

//查看最近购买的轻体计划
api.getPlanOrderList=function(){
    return _get(baseUrl+url.PlanOrderList);
};

//查看最近购买的轻体计划
api.getPlanProgress=function(urlParm){
    let _url=_urlMixPram(urlParm,url.PlanProgress);
    return _get(baseUrl+_url);
};

//查看最近购买的轻体计划
api.getPlanInfoByPlanOrderId=function(urlParm){
    let _url=_urlMixPram(urlParm,url.PlanInfoByPlanOrderId);
    return _get(baseUrl+_url);
};

//获取门店Sku列表
api.getStoreProductList=function(urlParm){
    let _url=_urlMixPram(urlParm,url.storeProductList);
    return _get(baseUrl+_url);
};

//获取门店Sku详细信息列表
api.getMultiProductInfo=function(urlParm){
    let _url=_urlMixPram(urlParm,url.multiProductInfo);
    return _get(baseUrl+_url);
};

//获取门店Sku酱料详细信息列表
api.getMultiSauceInfo=function(urlParm){
    let _url=_urlMixPram(urlParm,url.multiSauceInfo);
    return _get(baseUrl+_url);
};

//获取余额信息
api.getBalanceInfo=function(){
    return _get(baseUrl+url.currentBalanceInfo);
};

//获取小食信息
api.getSnackList=function(){
    return _get(baseUrl+url.snackList);
};

//获取小食标签标题
api.getSnackTitle=function(){
    return _get(baseUrl+url.snackTitle);
};

//获取最优优惠券
api.getBestCoupon=function(data){
    return _post(baseUrl+url.bestCoupon,data);
};

//获取订单价格
api.getOrderPrice=function(data){
    return _post(baseUrl+url.calculateOrderPrice,data);
};

//创建订单
api.orderCreate=function(data){
    return _post(baseUrl+url.orderCreate,data);
};

//获取验证码
api.getSendVerifyCode=function(data){
    return _post(baseUrl+url.sendVerifyCode,data);
};

//绑定手机号
api.bindMobile=function(data){
    return _post(baseUrl+url.bindMobile,data);
};

//实体店订单取餐号
api.getOrderSiteSerial=function(urlParm){
    let _url=_urlMixPram(urlParm,url.orderSiteSerial);
    return _post(baseUrl+_url);
};

//实体店订单详情
api.getOrderDetail=function(urlParm){
    let _url=_urlMixPram(urlParm,url.orderDetail);
    return _get(baseUrl+_url);
};

//修改订单
api.changeDeliveryInfo=function(data){
    return _post(baseUrl+url.changeDeliveryInfo,data);
};
//取消已支付订单
api.cancelPayOrder=function(data){
    return _post(baseUrl+url.cancelPayOrder,data);
};
//取消未支付订单
api.cancelOrder=function(urlParm,data){
    let _url=_urlMixPram(urlParm,url.cancelOrder);
    return _post(baseUrl+_url,data);
};


//获取微信轻体支付pre-payid
api.getPlanorderPrepay=function(urlParm){
    let _url=_urlMixPram(urlParm,url.planorderPrepay);
    return _get(baseUrl+_url);
};
//获取微信支付pre-payid
api.getOrderPrePay=function(urlParm){
    let _url=_urlMixPram(urlParm,url.orderPrepay);
    return _get(baseUrl+_url);
};

function markUrl(link,data){
    if (typeof data != "undefined" && data != "") {
        var paramArr = [];
        for (var attr in  data) {
            paramArr.push(attr + '=' +  data[attr]);
        }
        link += '?' + paramArr.join('&');
    }
    return link;
}

//function
function _urlMixPram(parm,url){
    let _url=url;
    for(let i in parm){
        _url=_url.replace('{'+i+'}',parm[i]);
    }
    return _url;
}

function _get(url){
    let _parameter={};
    _parameter.headers={
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };
    _parameter.method='GET';
    _parameter.credentials='include';

    let _url='';
    if(url.search(/\?/)>=0){
        _url=url+'&'+sger;
    }else{
        _url=url+'?'+sger;
    }

    return fetch(_url,_parameter).then((res)=>{
        "use strict";
        if (res.status >= 200 && res.status < 300) {
            return res.json();
        }
    },()=>{
        "use strict";
        console.log(url+'请求失败');
    }).then((res)=>{
        if(res){
            return res.data
        }else{
            return Promise.reject(new Error(url+'请求失败'))
        }
    })

}

function _post(url,data){
    let _parameter={};
    _parameter.headers={
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };
    _parameter.method='POST';
    _parameter.credentials='include';
    _parameter.body=JSON.stringify(data);

    let _url='';
    if(url.search(/\?/)>=0){
        _url=url+'&'+sger;
    }else{
        _url=url+'?'+sger;
    }

    return fetch(_url,_parameter).then((res)=>{
        "use strict";
        if (res.status >= 200 && res.status < 300) {
            return res.json();
        }else{
            return res;
        }
    },()=>{
        "use strict";
        console.log(url+'请求失败');
    }).then((res)=>{
        if(res){
            if(res.data){
                return res.data
            }else{
                return res
            }
        }else{
            return Promise.reject(new Error(url+'请求失败'))
        }

    });
}
//exports
module.exports=api;
