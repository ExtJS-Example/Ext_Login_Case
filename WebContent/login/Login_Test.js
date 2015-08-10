Ext.onReady(function() {
	// 开启提示功能
	Ext.QuickTips.init();
	
	// 定义登陆表单
	var loginPanel = new Ext.FormPanel({
		id: 'LoginPanel',
		layout: 'form',
		renderTo: Ext.getBody(),
		baseCls: 'x-plain',
		width: 240,
		height: 120,
		labelWidth: 75,		// 此表单中的标签长度
		defaults: {
			xtype: 'textfield'
		},
		style: 'padding: 15px 15px 0px 15px;',	// 当前Panel的填充: 上(15px),左(15px)
		buttonAlign: 'center',	// 按钮位置
		items: [{
			name: 'username',
			fieldLabel: '用户名',
			allowBlank: false,
			blankText: '用户名不能为空!'
		}, {
			name: 'password',
			fieldLabel: '密码',
			allowBlank: false,
			blankText: '密码不能为空!'
		}],
		buttons: [{
			text: '登陆',
			width: 50,
			handler: function(btn) {
				var basicForm = btn.ownerCt.ownerCt.getForm();
				if(basicForm.isValid()) {	// 验证合法后使用加载进度条
					Ext.Msg.show({
						title: '请稍等',
						msg: '正在加载',
						width: 300,
						progress: true,
						progressText: '',
						clasable: false,
						ainmEL: 'loading'
					});
					// 控制进度条速度
					var f = function(v) {
						return function() {
							var i=v/11;
							Ext.Msg.updateProgress(i, '');
						};
					};
					for(var i=1; i<13; i++) {
						setTimeout(f(i), i*150);
					}
					
					// 提交到服务器操作
					basicForm.submit({
						url: 'login',
						method: 'post',
						params: {		// 测试submit传递其它参数
							test: 'hello',
							param: 'world'
						},
						success: function(form, action) {
							if(action.result.success) {
								document.location = 'login_success.html';
							} else {
								Ext.Msg.alert('登陆错误', action.result.msg);
							}
						},
						failure: function(form, action) {
							Ext.Msg.alert('错误', '服务器端出现错误, 请稍后重试!');
						}
					});
				}
			}
		}, {
			text: '重置',
			width: 60,
			handler: function(btn) {
				btn.ownerCt.ownerCt.getForm().reset();
			}
		}]
	});

	// 定义登陆窗口
	var loginWin = new Ext.Window({
		title: '登陆窗口',
		layout: 'fit',
		closable: false,
		plain: true,
		modal: true,	// 遮罩其它
		items: [loginPanel]
	});
	loginWin.show();
	
});