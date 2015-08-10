package com.csdn.controll;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginCheck extends HttpServlet{

	private static final long serialVersionUID = 5693130840331690394L;
	private int index;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("...............前台的命令传过来了:"+index+"........................");
		index++;
		System.out.println("");
		response.setContentType("text/html");
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();

		String user = request.getParameter("name");
		String pwd = request.getParameter("password");
		System.out.println("=====================" + request.getParameter("params"));
		if("admin".equals(user) && "123".equals(pwd)) {
			out.print("{success:true, msg:\'ok\'}");
		} else {
			out.print("{success:true, msg:\'账号或密码错误!\'}");
		}
		
		out.flush();
		out.close();
	}

}
