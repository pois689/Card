package topia.spring.card.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import topia.spring.card.vo.UserInfoHobby;



@Repository
public class UserInfoHobbyDao {
	
	@Autowired
	private SqlSessionTemplate tpl;
	
	public Integer insert(Map<String, Object> paramMap) {
		return tpl.insert("hobbyDao.insert", paramMap);
	}
	
	public List<UserInfoHobby> list(int intUserIdx) {
		return tpl.selectList("hobbyDao.list", intUserIdx);
	}
	
	public Integer updateUserHobby(UserInfoHobby userInfoHobby) {
		return tpl.update("hobbyDao.updateUserHobby", userInfoHobby);
	}
}
