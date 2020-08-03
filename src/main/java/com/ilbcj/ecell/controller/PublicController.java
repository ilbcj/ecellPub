package com.ilbcj.ecell.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ilbcj.ecell.service.MatchService;

import com.ilbcj.ecell.util.R;

@RestController
@RequestMapping("/public")
public class PublicController {

	@Autowired
	private MatchService matchService;
	
	/**
	 * 查询选手数据
	 * @param players，nick数组
	 * @return
	 */
	@RequestMapping(value="/profile")
	public String queryPlayProfile(@RequestBody Map<String,Object> parm) {
		
		String profile = matchService.queryPlayerProfileById(parm);
		
		if(profile != null) {
			return profile;
		}
		return R.error("查询选手数据失败，请稍后再试！").toString();
				
	}
	
	/**
	 * 查询所有选手nick，用于选手数据页查询列表
	 * @param 空
	 * @return
	 */
	@RequestMapping(value="/player/list")
	public String queryPlayList(@RequestBody Map<String,Object> parm) {
		
		String profile = matchService.queryPlayerList(parm);
		
		if(profile != null) {
			return profile;
		}
		return R.error("查询选手数据失败，请稍后再试！").toString();
				
	}
	
	/**
	 * 查询所有赛季名称，用于首页查询列表
	 * @param 空
	 * @return
	 */
	@RequestMapping(value="/season/list")
	public String querySeasonList(@RequestBody Map<String,Object> parm) {
		
		String profile = matchService.querySeasonList(parm);
		
		if(profile != null) {
			return profile;
		}
		return R.error("查询赛季数据失败，请稍后再试！").toString();
				
	}

	/**
	 * 查询排名前十选手，用于首页查询列表
	 * @param 空
	 * @return
	 */
	@RequestMapping(value="/player/top10")
	public String queryTop10Players(@RequestBody Map<String,Object> parm) {
		
		String top10Players = matchService.queryTop10(parm);
		
		if(top10Players != null) {
			return top10Players;
		}
		return R.error("查询top10选手数据失败，请稍后再试！").toString();
				
	}
	
	/**
	 * 查询比赛日信息
	 * @param date 比赛日期
	 * @return
	 */
	@RequestMapping(value="/schedule/matches")
	public String queryScheduleMatches(@RequestBody Map<String,Object> parm) {
		
		String matches = matchService.queryScheduleMatches(parm);
		
		if(matches != null) {
			return matches;
		}
		return R.error("查询比赛日数据失败，请稍后再试！").toString();
				
	}
	
	/**
	 * 查询比赛对战信息
	 * @param scheduleId 赛程ID
	 * @param setId 场次ID
	 * @return
	 */
	@RequestMapping(value="/schedule/match/set", method = RequestMethod.POST)
	public String queryScheduleMatchSet(@RequestBody Map<String,Object> parm) {
		
		String matchSetGames = matchService.queryScheduleMatchSet(parm);
		
		if(matchSetGames != null) {
			return matchSetGames;
		}
		return R.error("查询比赛对战数据失败，请稍后再试！").toString();
	}
}
