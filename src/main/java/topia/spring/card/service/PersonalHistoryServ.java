package topia.spring.card.service;

import java.io.*;
import java.util.*;

import org.codehaus.jackson.*;
import org.codehaus.jackson.map.*;
import org.springframework.web.multipart.*;

import topia.spring.card.vo.*;

public interface PersonalHistoryServ {
	public HashMap<String, Object> userList(HashMap<String,Object> reqMap); 
	HashMap<String,Object> registerUser(Object inputdata);
	public int registerUserUpdate(HashMap<String,Object> intputdata);
	public HashMap<String, Object> getRegisterData(Map<String, Object> userIdx) throws JsonParseException, JsonMappingException, IOException;
	int imgInsert(MultipartFile file, String userName, Image image) throws IllegalStateException, IOException;
	int imgUpdate(MultipartFile file, String userName, Image image) throws IllegalStateException, IOException;
}
