var vm = new Vue({
	el: "#app",
	data: {
		hotproducts: [], //热门推荐商品
		carproducts: [], //购物商品
		totalScore: 0, //总积分
		totalMoney: 0, //总金额
	},
	created() { //使用ajax获取商品信息
		this.init();
	},
	methods: {
		//1.初始化数据
		init() {
			var _this = this;
			//使用ajax工具获取数据
			zxXhr.get("js/data.json", function(data) {
				_this.hotproducts = data;
				_this.initCar(); //初始化购物车信息
			})
		},
		//2.初始化购物车
		initCar() {
			var _this = this;
			var len = _this.hotproducts.length;
			for (var i = 7; i < len - 1; i++) {
				var tempPro = _this.hotproducts[i];
				_this.carproducts.push({
					product: tempPro, //购买的产品
					score: tempPro.discountPrice * 10, //积分
					discount: parseInt(100 * tempPro.discountPrice / tempPro.originalCost), //折扣
					count: 1 //购买数量
				});
			}
			this.$nextTick(function() {
				_this.inputNumber()
			})
		},
		//3.只能输入数字和删除键(要考虑输入的是字母或者非数字)
		inputNumber() {
			var txtBoxs = document.getElementsByName("txtCount");
			var len = txtBoxs.length;
			console.log("keydown")
			for (var i = 0; i < len; i++) {
				var txtbox = txtBoxs[i];
				txtbox.onkeydown = function() {
					console.log(event);
					if ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode == 8 || event.keyCode == 37 || event.keyCode ==
						39) {
						return true;
					}
					return false;
				}
			}
		},
		//4.删除购物车记录
		removeProcut(index) {
			var _this = this;
			if (confirm("确定要删除吗？")) {
				_this.carproducts.splice(index, 1);
			}
		},
		//5.购买商品
		addProduct(product) { //product 选中的商品对象
			// 			var _this = this;
			// 			//时候已存在相同的商品 
			// 			var pro = _this.carproducts.find(function(el) {
			// 				return el.product.id == product.id;
			// 			})
			// 			if(pro) { //存在相同的商品
			// 				pro.count++;
			// 			} else { //不存在  
			// 				_this.carproducts.push({
			// 					product: product, //购买的产品
			// 					score: product.discountPrice * 10, //积分
			// 					discount: parseInt(100 * product.discountPrice / product.originalCost), //折扣
			// 					count: 1 //购买数量
			// 				});
			// 				_this.$nextTick(() => {
			// 					//需要重新添加keydown事件
			// 					_this.inputNumber();
			// 				})
			// 
			// 			}
			var result = true;
			for (var i of this.carproducts) {
				if (product.productName == i.product.productName) { //判断名称是否已经存在
					i.count++;
					result = false;
					break;
				}
			}
			if (result) { //如果没则添加
				this.carproducts.push({
					product: product, //购买的产品
					score: product.discountPrice * 10, //积分
					discount: parseInt(100 * product.discountPrice / product.originalCost), //折扣
					count: 1 //购买数量
				});
			}
			//需要重新添加keydown事件
			this.$nextTick(function() {
				this.inputNumber()
			})
		},
		//改变数量+-
		changeCount(ite, way) {
			if (way > 0) {
				ite.count++;
			} else {
				ite.count <= 1 ? 1 : ite.count--;
			}
		}
	},
	filters: {
		twoDigit(value) {
			return value.toFixed(2);
		}
	},
	computed: { //计算属性
		saveMoney() {
			var _this = this;
			var mony = 0,
				totalScore = 0,
				totalMoney = 0;
			var len = _this.carproducts.length;
			for (var i = 0; i < len; i++) {
				var tempItem = _this.carproducts[i];
				mony += (tempItem.product.originalCost - tempItem.product.discountPrice) * tempItem.count;
				totalScore += tempItem.score * tempItem.count;
				totalMoney += tempItem.product.discountPrice * tempItem.count;
			}
			_this.totalScore = totalScore;
			_this.totalMoney = totalMoney;
			return mony;
		}
	},
	//进行dom操作的最佳时机(对于data初始化的数据有效，如果通过动态添加的数据通过nextTicket方法跟踪dom的更新。)
	mounted() {

	},
});
