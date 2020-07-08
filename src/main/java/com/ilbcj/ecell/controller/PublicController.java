package com.ilbcj.ecell.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ilbcj.ecell.dto.PubDaymatchDTO;
import com.ilbcj.ecell.dto.PubMatchCalendarDTO;
import com.ilbcj.ecell.dto.PubPlayerProfileDTO;
import com.ilbcj.ecell.service.MatchService;

import com.ilbcj.ecell.util.R;

@RestController
@RequestMapping("/public")
public class PublicController {

	@Autowired
	private MatchService matchService;
	
	@RequestMapping(value="/profile")
	public String queryPlayProfile(@RequestBody Map<String,Object> parm) {
		
		String profile = matchService.queryPlayerProfileById(parm);
		
		if(profile != null) {
			return profile;
		}
		return R.error("查询选手数据失败，请稍后再试！").toString();
				
	}
	
	
	@RequestMapping(value="/player/list")
	public String queryPlayList(@RequestBody Map<String,Object> parm) {
		
		String profile = matchService.queryPlayerList(parm);
		
		if(profile != null) {
			return profile;
		}
		return R.error("查询选手数据失败，请稍后再试！").toString();
				
	}
//	@RequestMapping(value="/calendar", method = RequestMethod.POST)
//	public R queryCalendar(@RequestBody Map<String,Object> parm) {
//		
//		String month = (String)parm.get("month");
//		if(month == null) {
//			return R.error("查询赛程日历数据失败，没有指定要查询的月份");
//		}
//		
//		PubMatchCalendarDTO calendar = matchService.queryMatchCalendar(month);
//		
//		if(calendar != null) {
//			return R.ok().put("calendar", calendar);
//		}
//		
//		return R.error("查询赛程日历数据失败，请稍后再试！");
//	}
//	
//	@RequestMapping(value="/daymatch", method = RequestMethod.POST)
//	public R queryDaymatch(@RequestBody Map<String,Object> parm) {
//		
//		String day = (String)parm.get("day");
//		if(day == null) {
//			return R.error("查询比赛日据失败，没有指定要查询的日期");
//		}
//		
//		List<PubDaymatchDTO> daymatches = matchService.queryDaymatch(day);
//		
//		if(daymatches != null) {
//			return R.ok().put("daymatches", daymatches);
//		}
//		
//		return R.error("查询比赛日据失败，请稍后再试！");
//	}
	
}
