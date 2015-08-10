Ext.onReady(function() {
	// 使用表单提示
	Ext.QuickTips.init();
	
	// 定义表单
	var simple = new Ext.FormPanel({
		labelWidth: 75,			    // 此表单中label长度
		baseCls: 'x-plain',
		defaults: {
			width: 150
		},
		defaultType: 'textfield',	// 默认字段类型
		style: 'padding: 15px 0px 0px 15px',	// 给组件中的元素添加自定义样式
		buttonAlign: 'center',		// FormPanel中按钮的位置
		items: [{
			fieldLabel: '账户',
			name: 'name',			// 元素名称
			allowBlank: false,		// 不允许为空
			blankText: '账户不能为空'	// 错误提示
		}, {
			inputType: 'password',
			fieldLabel: '密码',
			name: 'password',
			allowBlank: false,
			blankText: '密码不能为空'
		}],
		buttons: [{
			text: '登陆',
			type: 'submit',
			handler: function() {
				if(simple.form.isValid()) {	// 验证合法后使用加载进度条
					Ext.Msg.show({
						title: '请稍等',
						msg: '正在加载...',
						progressText: '',
						width: 300,
						progress: true,
						closable: false,
						ainmEl: 'loading'
					});
					// 控制进度条速度
					var f = function(v) {
						return function() {
							var i = v/11;
							Ext.Msg.updateProgress(i, '');
						};
					};
					for(var i=1; i<13; i++) {
						setTimeout(f(i), i*150);
					}
					// 提交到服务器操作
					simple.form.doAction('submit', {
						url: 'servlet/loginCheck',
						method: 'post',
						params: 'ddd',
						success: function(form, action) {
							if(action.result.msg == 'ok') {
								document.location = 'login_success.html';
							} else {
								Ext.Msg.alert('登陆错误', action.result.msg);
							}
						},
						failure: function(form, action) {
							Ext.Msg.alert('错误', '服务器端出现错误, 请稍后再试!');
						}
					});
				}
			}
		}, {
			text: '取消',
			handler: function() {
				simple.form.reset();	// 重置表单
			}
		}]
	});

	// 定义窗体
	var win = new Ext.Window({
		id: 'LoginWindow',
		title: '用户登录',
		layout: 'fit',
		width: 300,
		height: 150,
		plain: true,
		bodyStyle: 'padding:5px;',
		maximizable: false,			// 禁止最大化, defaults false
		closable: false,			// 禁止关闭, defaults true
		collapsible: false,			// 禁止折叠, defaults false
		buttonAlign: 'center',
		modal: true,				// 遮罩其它, defaults false
		items: [simple]
	});
	win.show();
});