package explorer;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;

import org.json.JSONException;
import org.json.JSONStringer;
public class jdbc {
	public static void main(String[]z){
		String database = "impinv22";
		String tablename = "tw";
		
		//System.out.println(listDatabases());
		//System.out.println(createDatabase(database));
		System.out.println(createTable(tablename));
		JSONStringer js = new JSONStringer();
		try {
			js
				.object()
					.key("s1").value("1")
					.key("s2").value("sdf")
					.key("s3").value("df")
					.key("dsfsf").value("dsfsdf")
				.endObject();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		System.out.println(INSERT(tablename,"v1","v2","v3","v4",js.toString()));
		System.out.println(SELECT(tablename,null,null,null,null));
		//System.out.println(dropDatabase("test3"));
		//System.out.println(listDatabases());
		//System.out.println(dropDatabase("exp"));
		//System.out.println(util.dropDatabase("test"));
		//System.out.println(util.dropDatabase("test2"));
		//System.out.println(util.dropDatabase("test3"));
		//System.out.println(listDatabases());
	}	 
	public static String createDatabase(String name){ 
		String q = "CREATE DATABASE "+name;
		System.out.println(q);
		return utilhelper.execute(q); 
	}
	public static String listDatabases(){
		String q = "SELECT datname FROM pg_database WHERE datistemplate = false";
		System.out.println(q);
		return utilhelper.executeQuery(q);		
	}
	public static String dropDatabase(String name){
		String q = "DROP DATABASE "+name;
		System.out.println(q);
		return utilhelper.execute(q);
	}
	//public static String insertTable(String tablename,String json){
	//	
	//}
	public static String createTable(String tablename){
		String q = 
				""
				+"CREATE TABLE t"+tablename+" ("
				+"	    id bigserial primary key,"
				+"	    s1 varchar(20) NULL,"
				+"	    s2 varchar(20) NULL,"
				+"	    s3 varchar(20) NULL,"
				+"	    s4 varchar(20) NULL,"
				+"	    json varchar(5000) NOT NULL,"
				+"	    d varchar(20) NULL"
				+");"	
		;
		System.out.println(q);
		return utilhelper.execute(q);
	}
	
	public static String INSERT(String tablename,String s1,String s2,String s3,String s4,String json){
		//EXTRACT(EPOCH FROM now()) * 1000
		String q = 
				"insert into t"+tablename+" (s1,s2,s3,s4,json,d)values("
						+"'"+s1+"',"
						+"'"+s2+"',"
						+"'"+s3+"',"
						+"'"+s4+"',"
						+"'"+json+"',"
						+"'"+new java.util.Date().getTime()+"'"
						+")"
				;
		System.out.println(q);
		return utilhelper.execute(q);
	}
	public static String SELECT(String tablename,String sq,String s2,String s3,String s4){
		String q= "select * from t"+tablename;
		System.out.println(q);
		return utilhelper.executeQuery(q);
	}
	
	
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
	public static String printRS(ResultSet rs,String errorMessage){
		return new Res(rs,errorMessage).toString();
	}
	public static String executeQuery(String q){
		ResultSet rs = null;
		String errorMessage ="";
		try {
			rs = c().prepareCall(q).executeQuery();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			errorMessage = e.getMessage();			
		}
		return new Res(rs,errorMessage).toString();
	}
	public static String execute(String q){
		boolean result = false;
		String errorMessage = "";
		try{
			result = c().createStatement().execute(q);
		}
		catch(Exception ex){
			errorMessage = ""+ex.getMessage();
		}
		return new Res(result,errorMessage).toString();
	}
}
class Res{
	public JSONStringer js;
	public Res(boolean result,String errorMessage){
		js=new JSONStringer();
		
		try {
			js.object();
				js.key("success");
				js.value(result);
				js.key("errorMessage");
				js.value(errorMessage);
			js.endObject();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public Res(ResultSet rs,String errorMessage){
		js=new JSONStringer();
		
		try {
				if(errorMessage==null){
					js.object().key("error").value(errorMessage).endObject();
					
				}else{
					int count = 0;
					js.object();
						js.key("success");
						js.array();
						
						while(rs!=null&&rs.next()){
							js.object();
							for(int i = 0 ; i < rs.getMetaData().getColumnCount(); i++){
								js.key(rs.getMetaData().getColumnLabel(i+1));
								js.value(rs.getObject(i+1));
							}
							++count;
							js.endObject();
						}
						js.endArray();
						js.key("count").value(count);
					js.endObject();
				}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public String toString(){
		return js.toString();
	}
}
