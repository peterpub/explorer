package explorer;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.json.JSONException;
import org.json.JSONStringer;


public class jdbc {
	public static void main(String[]z){
		//System.out.println(util.createDatabase("test3"));
		//System.out.println(util.dropDatabase("test3"));
		System.out.println(listDatabases());
		//System.out.println(dropDatabase("exp"));
		//System.out.println(util.dropDatabase("test"));
		//System.out.println(util.dropDatabase("test2"));
		//System.out.println(util.dropDatabase("test3"));
		System.out.println(listDatabases());
	}	 
	public static String createDatabase(String name){ 
		return utilhelper.execute("CREATE DATABASE "+name); 
	}
	public static String listDatabases(){
		return utilhelper.executeQuery("SELECT datname FROM pg_database WHERE datistemplate = false");		
	}
	public static String dropDatabase(String name){
		return utilhelper.execute("DROP DATABASE "+name);
	}
}
class Exp{
	public DataBase[]db;
	public Exp(){
		
	}
	
}
class DataBase{
	public String datname; 
}
class utilhelper{
	static Connection _c=null;
	static Connection c(){
		try {
			if(_c==null || _c.isClosed()){
			     try {
			    	 Class.forName("org.postgresql.Driver");
				     _c = DriverManager.getConnection("jdbc:postgresql://localhost:5432/exp","postgres", "qwerty");
				 } catch (Exception e) {
				        e.printStackTrace();
				        System.err.println(e.getClass().getName()+": "+e.getMessage());
				        System.exit(0);
				 }
				 //System.out.println("Opened database successfully");
				
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		 return _c;
	}
	public static String printRS(ResultSet rs){
		return new Res(rs).toString();
	}
	public static String executeQuery(String q){
		try {
			return printRS(c().prepareCall(q).executeQuery());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();			
		}
		return null;
	}
	public static String execute(String q){
		boolean result = false;
		try{
			result = c().createStatement().execute(q);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		return new Res(result).toString();
	}
}
class Res{
	public JSONStringer js;
	public Res(boolean result){
		js=new JSONStringer();
		
		try {
			js.object();
				js.key("success");
				js.value(result);
			js.endObject();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public Res(ResultSet rs){
		js=new JSONStringer();
		
		try {
			js.object();
				js.key("success");
				
				
				js.array();
				
				while(rs!=null&&rs.next()){
					js.object();
					for(int i = 0 ; i < rs.getMetaData().getColumnCount(); i++){
						js.key(rs.getMetaData().getColumnLabel(i+1));
						js.value(rs.getObject(i+1));
					}
					js.endObject();
				}
				js.endArray();
				
				
				
				
				
				
				
			js.endObject();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public String toString(){
		return js.toString();
	}
}
