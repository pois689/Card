package topia.spring.card.vo;

import lombok.Data;

@Data
public class Image {
	private Integer imgIdx;
	private Integer userIdx;
	private String imgName;

	@Override
	public String toString() {
		return "Image [imgIdx=" + imgIdx + ", userIdx=" + userIdx + ", imgName=" + imgName + "]";
	}
	
}
