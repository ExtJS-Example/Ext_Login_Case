package com.magus.action;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginAction extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * 默认构造函数
     */
    public LoginAction() {
        super();
    }

	/**
	 * doGet
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 调用doPost()函数
		doPost(request, response);
	}

	/**
	 * doPost
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.err.println("----------请求到来------------");
		
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String extra_para_1 = request.getParameter("test");
		String extra_para_2 = request.getParameter("param");
		
		if("".equals(extra_para_1) && "".equals(extra_para_2)) {
			System.out.println("BasicForm的submit方法可以传递额外的参数!");
		}
		
		response.setContentType("text/html");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		// 简易判断用户名和密码
		if("admin".equals(username) && "123".equals(password)) {
			out.print("{success: true, msg:\'登陆成功!\'}");
		} else {
			out.print("{success: false, msg:\'登账号或密码错误!\'}");
		}
		out.flush();
		out.flush();
		
		System.err.println("----------请求结束------------\n");
	}

}
