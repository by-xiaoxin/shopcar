var vm = new Vue({
    el:"#main",
    data:{
        // 数组渲染推荐商品
        shappmain:[
            [{
                priceName:'·JavaScript DOM编程艺术',
                oldPrice:'39.00',
                newPrice:'29.30',
            },
            {
                priceName:'·解禁（当当网独家首发）',
                oldPrice:'39.00',
                newPrice:'29.30',
            },
            {
                priceName:'·地王之王（金融危机下房地产行...',
                oldPrice:'39.00',
                newPrice:'29.30',
            },
            {
                priceName:'·逃庄',
                oldPrice:'39.00',
                newPrice:'29.30',
            }],
            [
               {
                     priceName:'·深入浅出MySQL数据库开发、优...',
                     oldPrice:'59.00',
                     newPrice:'47.20',
                 },
                 {
                     priceName:'·大玩家（马未都、王刚推荐!央...',
                     oldPrice:'34.80',
                     newPrice:'20.60',
                 },
                 {
                     priceName:'·都市风水师--官场风水小说：一...',
                     oldPrice:'39.80',
                     newPrice:'30.50',
                 },
                 {
                     priceName:'·国戏（以麻将术语解读宦海沉浮...',
                     oldPrice:'25.00',
                     newPrice:'17.30',
                 }
             ],
              // 数据渲染购物车内容
             [
                {
                    priceName:'私募（首部披露资本博弈秘密的金融...',
                    integral :'183',
                    oldPrice:'32.00',
                    newPrice:'18.90',
                    discount :'59',
                    num:1,
                    
                },
                {
                    priceName:'小团圆（张爱玲最神秘小说遗稿）',
                    integral :'173',
                    oldPrice:'28.00',
                    newPrice:'17.30',
                    discount :'62',
                    num:1,
                    
                },
                {
                    priceName:'不抱怨的世界(畅销全球80国的世界...',
                    integral :'154',
                    oldPrice:'24.80',
                    newPrice:'15.40',
                    discount :'62',
                    num:2,
                    
                },
                {
                    priceName:'福玛特双桶洗衣机XPB20-07S',
                    integral :'358',
                    oldPrice:'458.00',
                    newPrice:'358.00',
                    discount :'78',
                    num:1,
                    
                },
                {
                    priceName:'PHP和MySQL Web开发 （原书第4版）',
                    integral :'712',
                    oldPrice:'95.00',
                    newPrice:'71.20',
                    discount :'75',
                    num:1,
                    
                },
                {
                    priceName:'法布尔昆虫记',
                    cu:'（再买￥68.30即可参加“满199元减10元现金”活动）',
                    integral :'10',
                    oldPrice:'198.00',
                    newPrice:'130.70',
                    discount :'66',
                    num:1,
                   
                }
            ],
        ],
        isshow:true,
    },
    computed:{
        //计算总金额
        moneyall:function(){
            var totalPrice=0;
            for(var i=0;i<this.shappmain[2].length;i++){
                totalPrice+=this.shappmain[2][i].newPrice*this.shappmain[2][i].num;
            }
            return totalPrice;
        },
        // 获取的商品总积分
        scoreall:function(){
            var totalscore=0;
            for(var i=0;i<this.shappmain[2].length;i++){
                totalscore+=this.shappmain[2][i].integral*this.shappmain[2][i].num;
            }
            return totalscore;
        },
        //节省金额
        dismoneyall:function(){
            var totaldisscore=0;
            for(var i=0;i<this.shappmain[2].length;i++){
                totaldisscore+=(this.shappmain[2][i].oldPrice*this.shappmain[2][i].num)-(this.shappmain[2][i].newPrice*this.shappmain[2][i].num);
            }
            return totaldisscore;
        }
    },
    methods:{
        // 根据下标删除
        remov:function(index){
            if(confirm('是否删除')){
            this.shappmain[2].splice(index,1);
            }
        },
        //添加方法
        addshops(item){
            var bool=true;
            for(var i of this.shappmain[2]){
                if(item.priceName==i.priceName){
                    i.num++;
                    bool=false;
                    break;
                }
            }
            if(bool){
            this.shappmain[2].push({
                priceName:item.priceName,
                integral :(item.newPrice)*10,
                oldPrice:item.oldPrice,
                newPrice:item.newPrice,
                discount :parseInt((item.newPrice/item.oldPrice)*100),
                num:1,
                })
              }
        },
        //推荐商品隐藏显示
        hiden(){
            if(this.isshow==true){
           	this.isshow=false;
            }else{
                this.isshow=true;
            }
        },
    },
});