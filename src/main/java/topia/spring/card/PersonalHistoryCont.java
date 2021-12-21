package topia.spring.card;

// test
import java.io.*;
import java.util.*;

import javax.servlet.http.*;

import org.codehaus.jackson.*;
import org.codehaus.jackson.map.*;
import org.springframework.ui.*;
import org.springframework.web.multipart.*;

import topia.spring.card.vo.*;

public interface PersonalHistoryCont {
	public HashMap<String, Object> userList(HttpServletRequest request);
	public HashMap<String,Object> registerUser(HttpServletRequest request);
	public HashMap<String,Object> registerUserUpdate(HttpServletRequest request);
	public int imgInsert(MultipartFile file, String userName, Image image) throws IllegalStateException, IOException;
	HashMap<String, Object> getRegisterData(HttpServletRequest request, HttpServletResponse response, Model model)
			throws JsonParseException, JsonMappingException, IOException;
	int imgUpdate(MultipartFile file, String userName, Image image) throws IllegalStateException, IOException;
}
