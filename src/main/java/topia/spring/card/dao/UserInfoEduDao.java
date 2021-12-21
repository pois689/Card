package topia.spring.card.dao;

import java.util.*;

import org.mybatis.spring.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import topia.spring.card.vo.*;

@Repository
public class UserInfoEduDao {

	@Autowired
	private SqlSessionTemplate tpl;
	
	public Integer insert(Map<String, Object> paramMap) {
		return tpl.insert("eduDao.insert", paramMap);
	}
	
	public Integer updateUserEdu(UserInfoEdu userInfoEdu) {
		return tpl.update("eduDao.updateUserEdu", userInfoEdu);
	}

	public List<UserInfoEdu> list(int intUserIdx) {
		return tpl.selectList("eduDao.list", intUserIdx);
	}
}
