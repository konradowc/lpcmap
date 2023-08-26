var $ = function(id) { return document.getElementById(id); };

var output = $('output');
var classes = [];

var allBtn = $('allBtn');
var monBtn = $('monBtn');
var tueBtn = $('tueBtn');
var wedBtn = $('wedBtn');
var thuBtn = $('thuBtn');
var friBtn = $('friBtn');

var schoolMap = 
{
  "L4000": [0.38, 0.73],
  "L3100": [0.775, 0.105],
  "L3000": [0.74, 0.13],
  "L3200": [0.85, 0.35],
  "L2700": [0.745, 0.755],
  "L2500": [0.7, 0.55],
  "L2400": [0.645, 0.63],
  "L2300": [0.59, 0.45],
  "L2100": [0.6, 0.55],
  "L2000": [0.565, 0.55],
  "L1900": [0.42, 0.59],
  "L1850": [0.485, 0.51],
  "L1800": [0.505, 0.555],
  "L1700": [0.575, 0.64],
  "L1600": [0.535, 0.65],
  "L1310": [0.49, 0.705],
  "L1300": [0.50, 0.725],
  "L1100": [0.43, 0.55],
  "L1000": [0.465, 0.745],
  "L800": [0.48, 0.60],
  "L700": [0.48, 0.695],
  "L600": [0.462, 0.66],
  "L500": [0.455, 0.68],
  "L400": [0.435, 0.71],
  "L600A/B": [0.445, 0.615],
  "FVillage": [0.39, 0.63]
}

var colorList = [
  "deepskyblue",
  "mediumorchid",
  "lightcoral",
  "forestgreen",
  "darkorange",
  "gold",
  "teal",
  "thistle",
  "snow",
  "tan"
]

var parseLine = function(line)
{
	var newLine = "";
	var add = true;
	for(var i = 0; i < line.length; i++)
	{
		if(add)
		{
			if(line[i] == '<')
				add = false;
			else
				newLine += line[i];
		}
		else if(line[i] == '>')
		{
			add = true;
		}
	}
	
	return newLine;
}

var parseFile = function(text)
{
	var lines = text.split("\n");
	
	var classNum = 0;
	//console.log("start");
	for(var i = 0; i < lines.length; i++)
	{
		if(lines[i].substr(0, 136) == '<table  CLASS="datadisplaytable" SUMMARY="This layout table is used to present the schedule course detail"><caption class="captiontext">') // class start
		{
			var className = parseLine(lines[i]);
			console.log("" + className);
			
			var classTimes = [];
			var classDays = [];
			var classBuilding = [];
			var classRoom = [];
			while (i < lines.length && lines[i] != '<table  CLASS="datadisplaytable" SUMMARY="This layout table is used to present schedule notes">')
			{
				if(lines[i] == '<td CLASS="dddefault">Class</td>' || 
					  lines[i] == '<td CLASS="dddefault">Lab</td>') 
			    {
					classTimes.push(parseLine(lines[i+1]));
					classDays.push(parseLine(lines[i+2]));
					
					console.log("time: " + parseLine(lines[i+1]));
					console.log("day: " + parseLine(lines[i+2]));
					
					var bldroom = parseLine(lines[i+3]);
					console.log(bldroom);
					
					if(bldroom == "LTBA ONLINE")
					{
						classBuilding.push("ONLINE");
						classRoom.push("ONLINE");
					}
					else
					{
						var space = 0;
						while(bldroom[space] != ' ' && space < bldroom.length) space++;
						
						classBuilding.push(bldroom.substring(0, space));
						classRoom.push(bldroom.substring(space+1));
					}
					
					i+=7;
			    }
				else
				{						
					i++;
				}
			}
			
			classes[classNum] = {
			  name: className,
			  times: classTimes,
			  days: classDays,
			  bldg: classBuilding,
			  room: classRoom
			};
			
			classNum++;
		}

	}
}


var pageText;
pageText = `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/transitional.dtd">
<HTML lang="en">
<head>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Pragma" name="Cache-Control" content="no-cache">
<meta http-equiv="Cache-Control" name="Cache-Control" content="no-cache">
<LINK REL="stylesheet" HREF="/css/web_defaultapp.css" TYPE="text/css">
<LINK REL="stylesheet" HREF="/css/web_defaultprint.css" TYPE="text/css" media="print">
<link rel="shortcut icon" href="/wtlgifs/LogoOnlyColorSm.jpg" />
<title>Student Detail Schedule</title>
<meta http-equiv="Content-Script-Type" name="Default_Script_Language" content="text/javascript">
<SCRIPT LANGUAGE="JavaScript" TYPE="text/javascript">
<!-- Hide JavaScript from older browsers 
window.onunload = function() {submitcount=0;}
var submitcount=0;
function checkSubmit() {
if (submitcount == 0)
   {
   submitcount++;
   return true;
   }
else
   {
alert("Your changes have already been submitted.");
   return false;
   }
}
//  End script hiding -->
</SCRIPT>
<SCRIPT LANGUAGE="JavaScript" TYPE="text/javascript">
<!-- Hide JavaScript from older browsers 
//  Function to open a window
function windowOpen(window_url) {
   helpWin = window.open(window_url,'','toolbar=yes,status=no,scrollbars=yes,menubar=yes,resizable=yes,directories=no,location=no,width=350,height=400');
   if (document.images) { 
       if (helpWin) helpWin.focus()
   }
}
//  End script hiding -->
</SCRIPT>
</head>
<body>
<div class="headerwrapperdiv">
<div class="pageheaderdiv1">
<a href="#main_content" onMouseover="window.status='Go to Main Content'; return true" onMouseout="window.status=''; return true" OnFocus="window.status='Go to Main Content'; return true" onBlur="window.status=''; return true" class="skiplinks">Go to Main Content</a>
<h1>CLASS-Web Chabot-Las Positas Community College District</h1></DIV><div class="headerlinksdiv">
<SPAN class="pageheaderlinks2">
<map name="Module_Navigation_Links_H" title="Module Navigation Links">
<p>
<a href="#skip_Module_Navigation_Links_H" onMouseover="window.status='Skip Module Navigation Links'; return true" onMouseout="window.status=''; return true" onFocus="window.status='Skip Module Navigation Links'; return true" onBlur="window.status=''; return true"  class="skiplinks">Skip Module Navigation Links</a>
<table  CLASS="plaintable" SUMMARY="This is main table for displaying Tab Items."
                          WIDTH="100%" cellSpacing=0 cellPadding=0 border=0>
<tr>
<TD CLASS="pldefault">
<table  CLASS="plaintable" SUMMARY="This table displays Tab Items."
                 cellSpacing=0 cellPadding=0 border=0>
<tr>
<td class="taboff" height=22>
<a href="/pls/OWA_PROD/twbkwbis.P_GenMenu?name=bmenu.P_GenMnu" onMouseover="window.status='Personal Information'; return true" onMouseout="window.status=''; return true" onFocus="window.status='Personal Information'; return true" onBlur="window.status=''; return true" >Personal Information</a>
</TD>
<TD class="bgtaboff" height=22 vAlign="top" align="right">
<img src="/wtlgifs/web_tab_corner_right.gif" alt="Tab Corner Right" CLASS="headerImg" TITLE="Tab Corner Right"  NAME="web_tab_corner_right" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=20 WIDTH=8 />
</TD>
<td class="tabon"  height=22>
<a href="/pls/OWA_PROD/twbkwbis.P_GenMenu?name=bmenu.P_StuMainMnu" onMouseover="window.status='Student Services'; return true" onMouseout="window.status=''; return true" onFocus="window.status='Student Services'; return true" onBlur="window.status=''; return true" >Student Services</a>
</TD>
<TD class="bgtabon"  height=22 vAlign="top" align="right">
<img src="/wtlgifs/web_tab_corner_right.gif" alt="Tab Corner Right" CLASS="headerImg" TITLE="Tab Corner Right"  NAME="web_tab_corner_right" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=20 WIDTH=8 />
</TD>
<td class="tabon"  height=22>
<a href="/pls/OWA_PROD/bzsktest.P_SixSteps" onMouseover="window.status='Steps to Success'; return true" onMouseout="window.status=''; return true" onFocus="window.status='Steps to Success'; return true" onBlur="window.status=''; return true" >Steps to Success</a>
</TD>
<TD class="bgtabon"  height=22 vAlign="top" align="right">
<img src="/wtlgifs/web_tab_corner_right.gif" alt="Tab Corner Right" CLASS="headerImg" TITLE="Tab Corner Right"  NAME="web_tab_corner_right" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=20 WIDTH=8 />
</TD>
<td class="taboff" height=22>
<a href="/pls/OWA_PROD/twbkwbis.P_GenMenu?name=bmenu.P_FAApplStuMnu" onMouseover="window.status='Financial Aid'; return true" onMouseout="window.status=''; return true" onFocus="window.status='Financial Aid'; return true" onBlur="window.status=''; return true" >Financial Aid</a>
</TD>
<TD class="bgtaboff" height=22 vAlign="top" align="right">
<img src="/wtlgifs/web_tab_corner_right.gif" alt="Tab Corner Right" CLASS="headerImg" TITLE="Tab Corner Right"  NAME="web_tab_corner_right" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=20 WIDTH=8 />
</TD>
<td class="taboff" height=22>
<a href="/pls/OWA_PROD/twbkwbis.P_GenMenu?name=pmenu.P_MainMnu" onMouseover="window.status='Employee Services'; return true" onMouseout="window.status=''; return true" onFocus="window.status='Employee Services'; return true" onBlur="window.status=''; return true" >Employee Information</a>
</TD>
<TD class="bgtaboff" height=22 vAlign="top" align="right">
<img src="/wtlgifs/web_tab_corner_right.gif" alt="Tab Corner Right" CLASS="headerImg" TITLE="Tab Corner Right"  NAME="web_tab_corner_right" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=20 WIDTH=8 />
</TD>
<td class="taboff" height=22>
<a href="/pls/OWA_PROD/twbkwbis.P_GenMenu?name=bmenu.P_FacMainMnu" onMouseover="window.status='Faculty and Staff Menu'; return true" onMouseout="window.status=''; return true" onFocus="window.status='Faculty and Staff Menu'; return true" onBlur="window.status=''; return true" >Faculty and Staff Menu</a>
</TD>
<TD class="bgtaboff" height=22 vAlign="top" align="right">
<img src="/wtlgifs/web_tab_corner_right.gif" alt="Tab Corner Right" CLASS="headerImg" TITLE="Tab Corner Right"  NAME="web_tab_corner_right" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=20 WIDTH=8 />
</TD>
</tr>
</table>
</TD>
</tr>
<tr>
<TD class="bgtabon" width="100%" colSpan=2><img src="/wtlgifs/web_transparent.gif" alt="Transparent Image" CLASS="headerImg" TITLE="Transparent Image"  NAME="web_transparent" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=2 WIDTH=10 /></TD></tr></table>
</map>
</SPAN>
<a name="skip_Module_Navigation_Links_H"></a>
</DIV>
<table  CLASS="plaintable" SUMMARY="This table displays Menu Items and Banner Search textbox." WIDTH="100%">
<tr>
<TD CLASS="pldefault">
<div class="headerlinksdiv2">
<form action="/pls/OWA_PROD/twbksrch.P_ShowResults" method="post">
Search
<SPAN class="fieldlabeltextinvisible"><LABEL for=keyword_in_id><SPAN class="fieldlabeltext">Search</SPAN></LABEL></SPAN>
<input type="text" name="KEYWRD_IN" size="20" maxlength="65" ID="keyword_in_id" />
<input type="submit" value="Go" />
</form>
</div>
</TD>
<TD CLASS="pldefault"><p class="rightaligntext" /p>
<SPAN class="pageheaderlinks">
<a href="/pls/OWA_PROD/twbkwbis.P_GenMenu?name=bmenu.P_RegMnu"  class="submenulinktext2" id="ssbbackurl">RETURN TO MENU</a>
|
<a href="/pls/OWA_PROD/twbksite.P_DispSiteMap?menu_name_in=bmenu.P_MainMnu&amp;depth_in=2&amp;columns_in=3" accesskey="2" class="submenulinktext2">SITE MAP</a>
|
<a href="/pls/OWA_PROD/twbkfrmt.P_DispHelp?pagename_in=bwskfshd.P_CrseSchdDetl" accesskey="H" onClick="popup = window.open('/pls/OWA_PROD/twbkfrmt.P_DispHelp?pagename_in=bwskfshd.P_CrseSchdDetl', 'PopupPage','height=500,width=450,scrollbars=yes,resizable=yes'); return false" target="_blank" onMouseOver="window.status='';  return true" onMouseOut="window.status=''; return true"onFocus="window.status='';  return true" onBlur="window.status=''; return true"  class="submenulinktext2">HELP</a>
|
<a href="twbkwbis.P_Logout" accesskey="3" class="submenulinktext2">EXIT</a>
</span>
</TD>
</tr>
</table>
</DIV>
<div class="pagetitlediv">
<table  CLASS="plaintable" SUMMARY="This table displays title and static header displays." WIDTH="100%">
<tr>
<TD CLASS="pldefault">
<h2>Student Detail Schedule</h2>
</TD>
<TD CLASS="pldefault">
&nbsp;
</TD>
<TD CLASS="pldefault"><p class="rightaligntext" /p>
<div class="staticheaders">
info<br>
Spring 2023<br>
Aug 25, 2023 07:17 pm<br>
</div>
</TD>
</tr>
<tr>
<TD class="bg3" width="100%" colSpan=3><img src="/wtlgifs/web_transparent.gif" alt="Transparent Image" CLASS="headerImg" TITLE="Transparent Image"  NAME="web_transparent" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=2 WIDTH=10 /></TD>
</tr>
</table>
<a name="main_content"></a>
</DIV>
<div class="pagebodydiv">
<!--  ** END OF twbkwbis.P_OpenDoc **  -->
<div class="infotextdiv"><table  CLASS="infotexttable" SUMMARY="This layout table contains information that may be helpful in understanding the content and functionality of this page.  It could be a brief set of instructions, a description of error messages, or other special information."><tr><td CLASS="indefault"><SPAN class="infotext"> <p></p> <p><font size=+1><a href="pw_sched_bill.p_start_here">Printable Class Schedule</a></font></p></SPAN></td></tr></table><p></DIV>
<a href="https://bncvirtual.com/vb_buy2.php?ACTION=registrar&FVGRP=CHA" target=%22Bookstore%22 ">Order my Chabot Books</a>
<a href="https://www.bkstr.com/webApp/discoverShop?merfnbr=389&termDir=SP23&division1=&department1=CIS&course1=59C&section1=30536&division2=&department2=CS&course2=47&section2=32477&division3=&department3=KIN&course3=VB2&section3=30708&division4=&department4=MATH&course4=5&section4=30177&division5=&department5=PHYS&course5=1C&section5=31227&division6=&department6=TUTR&course6=17B&section6=31045" target="Bookstore">Order my Las Positas Books</a><br />
<p>
Total Credit Hours: 16.000
<br />
<br />
<table  CLASS="datadisplaytable" SUMMARY="This layout table is used to present the schedule course detail"><caption class="captiontext">Web Programming - JavaScript - CIS 59C - H01</caption>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Associated Term:</th>
<td CLASS="dddefault">Spring 2023</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" ><ACRONYM title = "Course Reference Number">CRN</ACRONYM>:</th>
<td CLASS="dddefault">30536</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Status:</th>
<td CLASS="dddefault">**Web Registered** on Dec 23, 2022</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Assigned Instructor:</th>
<TD CLASS="dddefault">
ENGJELLUSHE VANI, 
ENGJELLUSHE VANI
</TD>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Grade Mode:</th>
<td CLASS="dddefault">Grade only (Letter)</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Credits:</th>
<td CLASS="dddefault">    3.000</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Level:</th>
<td CLASS="dddefault">Undergraduate</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Campus:</th>
<td CLASS="dddefault">Las Positas College</td>
</tr>
</table>
<table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
<tr>
<th CLASS="ddheader" scope="col" >Type</th>
<th CLASS="ddheader" scope="col" >Time</th>
<th CLASS="ddheader" scope="col" >Days</th>
<th CLASS="ddheader" scope="col" >Where</th>
<th CLASS="ddheader" scope="col" >Date Range</th>
<th CLASS="ddheader" scope="col" >Schedule Type</th>
<th CLASS="ddheader" scope="col" >Instructors</th>
</tr>
<tr>
<td CLASS="dddefault">Class</td>
<td CLASS="dddefault">6:30 pm - 8:50 pm</td>
<td CLASS="dddefault">R</td>
<td CLASS="dddefault">L1000 1013</td>
<td CLASS="dddefault">Jan 17, 2023 - May 26, 2023</td>
<td CLASS="dddefault">Lecture/Discussion</td>
<td CLASS="dddefault">ENGJELLUSHE  VANI (<ABBR title= "Primary">P</ABBR>)</td>
</tr>
<tr>
<td CLASS="dddefault">Lab</td>
<td CLASS="dddefault"><ABBR title = "To Be Announced">TBA</ABBR></td>
<td CLASS="dddefault">&nbsp;</td>
<td CLASS="dddefault">LTBA ONLINE</td>
<td CLASS="dddefault">Jan 17, 2023 - May 26, 2023</td>
<td CLASS="dddefault">Dist Ed Internet (DLD LAB)</td>
<td CLASS="dddefault">ENGJELLUSHE  VANI </td>
</tr>
</table>
<br />
<table  CLASS="datadisplaytable" SUMMARY="This layout table is used to present schedule notes">
<tr>
<th CLASS="ddheader" scope="col" >Note</th>
<td CLASS="dddefault"><tr><td colspan="9">This course meets both in-person and online. Carefully note the day, time and building the course will meet in-person. Other instruction is completed online. The instructor will provide more details through the learning system Canvas at the start of the semester.</td>
</tr>
</table>
<p>
<table  CLASS="datadisplaytable" SUMMARY="This layout table is used to present the schedule course detail"><caption class="captiontext">Capstone Project - CS 47 - A01</caption>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Associated Term:</th>
<td CLASS="dddefault">Spring 2023</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" ><ACRONYM title = "Course Reference Number">CRN</ACRONYM>:</th>
<td CLASS="dddefault">32477</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Status:</th>
<td CLASS="dddefault">**Web Registered** on Nov 14, 2022</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Assigned Instructor:</th>
<TD CLASS="dddefault">
CARLOS I. MORENO, 
CARLOS I. MORENO
</TD>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Grade Mode:</th>
<td CLASS="dddefault">Grade only (Letter)</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Credits:</th>
<td CLASS="dddefault">    3.000</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Level:</th>
<td CLASS="dddefault">Undergraduate</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Campus:</th>
<td CLASS="dddefault">Las Positas College</td>
</tr>
</table>
<table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
<tr>
<th CLASS="ddheader" scope="col" >Type</th>
<th CLASS="ddheader" scope="col" >Time</th>
<th CLASS="ddheader" scope="col" >Days</th>
<th CLASS="ddheader" scope="col" >Where</th>
<th CLASS="ddheader" scope="col" >Date Range</th>
<th CLASS="ddheader" scope="col" >Schedule Type</th>
<th CLASS="ddheader" scope="col" >Instructors</th>
</tr>
<tr>
<td CLASS="dddefault">Class</td>
<td CLASS="dddefault"><ABBR title = "To Be Announced">TBA</ABBR></td>
<td CLASS="dddefault">&nbsp;</td>
<td CLASS="dddefault">LTBA ONLINE</td>
<td CLASS="dddefault">Jan 17, 2023 - May 26, 2023</td>
<td CLASS="dddefault">Lecture/Discussion</td>
<td CLASS="dddefault">CARLOS  MORENO (<ABBR title= "Primary">P</ABBR>)</td>
</tr>
<tr>
<td CLASS="dddefault">Lab</td>
<td CLASS="dddefault"><ABBR title = "To Be Announced">TBA</ABBR></td>
<td CLASS="dddefault">&nbsp;</td>
<td CLASS="dddefault">LTBA ONLINE</td>
<td CLASS="dddefault">Jan 17, 2023 - May 26, 2023</td>
<td CLASS="dddefault">Lab</td>
<td CLASS="dddefault">CARLOS  MORENO </td>
</tr>
</table>
<br />
<table  CLASS="datadisplaytable" SUMMARY="This layout table is used to present schedule notes">
<tr>
<th CLASS="ddheader" scope="col" >Note</th>
<td CLASS="dddefault"><tr><td colspan="9">This course is an asynchronous online class. It does not have scheduled meeting times. Weekly assignments are completed independently by the established deadlines in the syllabus.  Materials are accessed through the learning system Canvas.</td>
</tr>
</table>
<p>
<table  CLASS="datadisplaytable" SUMMARY="This layout table is used to present the schedule course detail"><caption class="captiontext">Volleyball Intermediate - KIN VB2 - D01</caption>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Associated Term:</th>
<td CLASS="dddefault">Spring 2023</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" ><ACRONYM title = "Course Reference Number">CRN</ACRONYM>:</th>
<td CLASS="dddefault">30708</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Status:</th>
<td CLASS="dddefault">**Web Registered** on Dec 23, 2022</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Assigned Instructor:</th>
<TD CLASS="dddefault">
PAUL SAPSFORD
</TD>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Grade Mode:</th>
<td CLASS="dddefault">Grade only (Letter)</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Credits:</th>
<td CLASS="dddefault">    1.000</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Level:</th>
<td CLASS="dddefault">Undergraduate</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Campus:</th>
<td CLASS="dddefault">Las Positas College</td>
</tr>
</table>
<table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
<tr>
<th CLASS="ddheader" scope="col" >Type</th>
<th CLASS="ddheader" scope="col" >Time</th>
<th CLASS="ddheader" scope="col" >Days</th>
<th CLASS="ddheader" scope="col" >Where</th>
<th CLASS="ddheader" scope="col" >Date Range</th>
<th CLASS="ddheader" scope="col" >Schedule Type</th>
<th CLASS="ddheader" scope="col" >Instructors</th>
</tr>
<tr>
<td CLASS="dddefault">Class</td>
<td CLASS="dddefault">9:30 am - 10:45 am</td>
<td CLASS="dddefault">MW</td>
<td CLASS="dddefault">L2500 PE101</td>
<td CLASS="dddefault">Jan 17, 2023 - May 26, 2023</td>
<td CLASS="dddefault">Demonstration/Exercise</td>
<td CLASS="dddefault">PAUL  SAPSFORD (<ABBR title= "Primary">P</ABBR>)</td>
</tr>
</table>
<br />
<table  CLASS="datadisplaytable" SUMMARY="This layout table is used to present schedule notes">
<tr>
<th CLASS="ddheader" scope="col" >Note</th>
<td CLASS="dddefault"><tr><td colspan="9">This is a day section that meets in-person at the Las Positas College campus.</td>
</tr>
</table>
<p>
<table  CLASS="datadisplaytable" SUMMARY="This layout table is used to present the schedule course detail"><caption class="captiontext">Ordinary Differential Equation - MATH 5 - E01</caption>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Associated Term:</th>
<td CLASS="dddefault">Spring 2023</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" ><ACRONYM title = "Course Reference Number">CRN</ACRONYM>:</th>
<td CLASS="dddefault">30177</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Status:</th>
<td CLASS="dddefault">**Web Registered** on Nov 14, 2022</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Assigned Instructor:</th>
<TD CLASS="dddefault">
GHOLAMREZA BROJERDI, 
GHOLAMREZA BROJERDI, 
GHOLAMREZA BROJERDI
</TD>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Grade Mode:</th>
<td CLASS="dddefault">Grade only (Letter)</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Credits:</th>
<td CLASS="dddefault">    3.500</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Level:</th>
<td CLASS="dddefault">Undergraduate</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Campus:</th>
<td CLASS="dddefault">Las Positas College</td>
</tr>
</table>
<table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
<tr>
<th CLASS="ddheader" scope="col" >Type</th>
<th CLASS="ddheader" scope="col" >Time</th>
<th CLASS="ddheader" scope="col" >Days</th>
<th CLASS="ddheader" scope="col" >Where</th>
<th CLASS="ddheader" scope="col" >Date Range</th>
<th CLASS="ddheader" scope="col" >Schedule Type</th>
<th CLASS="ddheader" scope="col" >Instructors</th>
</tr>
<tr>
<td CLASS="dddefault">Class</td>
<td CLASS="dddefault">7:30 pm - 9:20 pm</td>
<td CLASS="dddefault">M</td>
<td CLASS="dddefault">L2400 2414</td>
<td CLASS="dddefault">Jan 17, 2023 - May 26, 2023</td>
<td CLASS="dddefault">Lecture/Discussion</td>
<td CLASS="dddefault">GHOLAMREZA  BROJERDI (<ABBR title= "Primary">P</ABBR>)</td>
</tr>
<tr>
<td CLASS="dddefault">Class</td>
<td CLASS="dddefault">7:30 pm - 8:20 pm</td>
<td CLASS="dddefault">W</td>
<td CLASS="dddefault">L2400 2414</td>
<td CLASS="dddefault">Jan 17, 2023 - May 26, 2023</td>
<td CLASS="dddefault">Lecture/Discussion</td>
<td CLASS="dddefault">GHOLAMREZA  BROJERDI </td>
</tr>
<tr>
<td CLASS="dddefault">Lab</td>
<td CLASS="dddefault">8:30 pm - 9:45 pm</td>
<td CLASS="dddefault">W</td>
<td CLASS="dddefault">L2400 2414</td>
<td CLASS="dddefault">Jan 17, 2023 - May 26, 2023</td>
<td CLASS="dddefault">Lab</td>
<td CLASS="dddefault">GHOLAMREZA  BROJERDI </td>
</tr>
</table>
<br />
<table  CLASS="datadisplaytable" SUMMARY="This layout table is used to present schedule notes">
<tr>
<th CLASS="ddheader" scope="col" >Note</th>
<td CLASS="dddefault"><tr><td colspan="9">This is a day section that meets in-person at the Las Positas College campus. A TI-84 or TI-83 calculator or internet-based software may be required for some sections of this course.  There may be a fee associated with these materials. Consult with the instructor or bookstore before registering for this course.</td>
</tr>
</table>
<p>
<table  CLASS="datadisplaytable" SUMMARY="This layout table is used to present the schedule course detail"><caption class="captiontext">General Physics III - PHYS 1C - D01</caption>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Associated Term:</th>
<td CLASS="dddefault">Spring 2023</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" ><ACRONYM title = "Course Reference Number">CRN</ACRONYM>:</th>
<td CLASS="dddefault">31227</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Status:</th>
<td CLASS="dddefault">**Web Registered** on Nov 14, 2022</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Assigned Instructor:</th>
<TD CLASS="dddefault">
ROBIN E. REHAGEN, 
ROBIN E. REHAGEN
</TD>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Grade Mode:</th>
<td CLASS="dddefault">Grade only (Letter)</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Credits:</th>
<td CLASS="dddefault">    5.000</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Level:</th>
<td CLASS="dddefault">Undergraduate</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Campus:</th>
<td CLASS="dddefault">Las Positas College</td>
</tr>
</table>
<table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
<tr>
<th CLASS="ddheader" scope="col" >Type</th>
<th CLASS="ddheader" scope="col" >Time</th>
<th CLASS="ddheader" scope="col" >Days</th>
<th CLASS="ddheader" scope="col" >Where</th>
<th CLASS="ddheader" scope="col" >Date Range</th>
<th CLASS="ddheader" scope="col" >Schedule Type</th>
<th CLASS="ddheader" scope="col" >Instructors</th>
</tr>
<tr>
<td CLASS="dddefault">Class</td>
<td CLASS="dddefault">11:00 am - 12:50 pm</td>
<td CLASS="dddefault">TR</td>
<td CLASS="dddefault">L1850 1872</td>
<td CLASS="dddefault">Jan 17, 2023 - May 26, 2023</td>
<td CLASS="dddefault">Lecture/Discussion</td>
<td CLASS="dddefault">ROBIN  REHAGEN (<ABBR title= "Primary">P</ABBR>)</td>
</tr>
<tr>
<td CLASS="dddefault">Lab</td>
<td CLASS="dddefault">1:00 pm - 3:50 pm</td>
<td CLASS="dddefault">T</td>
<td CLASS="dddefault">L1800 1822</td>
<td CLASS="dddefault">Jan 17, 2023 - May 26, 2023</td>
<td CLASS="dddefault">Lab</td>
<td CLASS="dddefault">ROBIN  REHAGEN </td>
</tr>
</table>
<br />
<table  CLASS="datadisplaytable" SUMMARY="This layout table is used to present schedule notes">
<tr>
<th CLASS="ddheader" scope="col" >Note</th>
<td CLASS="dddefault"><tr><td colspan="9">This is a day section that meets in-person at the Las Positas College campus.</td>
</tr>
</table>
<p>
<table  CLASS="datadisplaytable" SUMMARY="This layout table is used to present the schedule course detail"><caption class="captiontext">Tutoring Theory & Practice II - TUTR 17B - S01</caption>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Associated Term:</th>
<td CLASS="dddefault">Spring 2023</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" ><ACRONYM title = "Course Reference Number">CRN</ACRONYM>:</th>
<td CLASS="dddefault">31045</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Status:</th>
<td CLASS="dddefault">**Web Registered** on Dec 18, 2022</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Assigned Instructor:</th>
<TD CLASS="dddefault">
JIN TSUBOTA, 
JIN TSUBOTA, 
JIN TSUBOTA
</TD>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Grade Mode:</th>
<td CLASS="dddefault">Grade only (Letter)</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Credits:</th>
<td CLASS="dddefault">    0.500</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Level:</th>
<td CLASS="dddefault">Undergraduate</td>
</tr>
<tr>
<th colspan="2" CLASS="ddlabel" scope="row" >Campus:</th>
<td CLASS="dddefault">Las Positas College</td>
</tr>
</table>
<table  CLASS="datadisplaytable" SUMMARY="This table lists the scheduled meeting times and assigned instructors for this class.."><caption class="captiontext">Scheduled Meeting Times</caption>
<tr>
<th CLASS="ddheader" scope="col" >Type</th>
<th CLASS="ddheader" scope="col" >Time</th>
<th CLASS="ddheader" scope="col" >Days</th>
<th CLASS="ddheader" scope="col" >Where</th>
<th CLASS="ddheader" scope="col" >Date Range</th>
<th CLASS="ddheader" scope="col" >Schedule Type</th>
<th CLASS="ddheader" scope="col" >Instructors</th>
</tr>
<tr>
<td CLASS="dddefault">Class</td>
<td CLASS="dddefault">12:30 pm - 3:20 pm</td>
<td CLASS="dddefault">F</td>
<td CLASS="dddefault">LTBA ONLINE</td>
<td CLASS="dddefault">Jan 27, 2023 - Jan 27, 2023</td>
<td CLASS="dddefault">Lecture/Discussion</td>
<td CLASS="dddefault">JIN  TSUBOTA (<ABBR title= "Primary">P</ABBR>)</td>
</tr>
<tr>
<td CLASS="dddefault">Class</td>
<td CLASS="dddefault">12:30 pm - 3:20 pm</td>
<td CLASS="dddefault">F</td>
<td CLASS="dddefault">LTBA ONLINE</td>
<td CLASS="dddefault">Feb 10, 2023 - Feb 10, 2023</td>
<td CLASS="dddefault">Lecture/Discussion</td>
<td CLASS="dddefault">JIN  TSUBOTA </td>
</tr>
<tr>
<td CLASS="dddefault">Class</td>
<td CLASS="dddefault">12:30 pm - 3:20 pm</td>
<td CLASS="dddefault">F</td>
<td CLASS="dddefault">LTBA ONLINE</td>
<td CLASS="dddefault">Mar 03, 2023 - Mar 03, 2023</td>
<td CLASS="dddefault">Lecture/Discussion</td>
<td CLASS="dddefault">JIN  TSUBOTA </td>
</tr>
</table>
<br />
<table  CLASS="datadisplaytable" SUMMARY="This layout table is used to present schedule notes">
<tr>
<th CLASS="ddheader" scope="col" >Note</th>
<td CLASS="dddefault"><tr><td colspan="9">This course is a synchronous online class in which instruction occurs remotely at a scheduled time. Carefully note the day and time the course will meet online. Materials and links to the virtual classroom, ConferZoom, are accessed through the learning system Canvas.</td>
</tr>
</table>
<p>
<a href="javascript:history.go(-1)" onMouseOver="window.status='Return to Previous';  return true" onFocus="window.status='Return to Previous';  return true" onMouseOut="window.status='';  return true"onBlur="window.status='';  return true">Return to Previous</a>

<!--  ** START OF twbkwbis.P_CloseDoc **  -->
<table  CLASS="plaintable" SUMMARY="This is table displays line separator at end of the page." WIDTH="100%" cellSpacing=0 cellPadding=0 border=0><tr><TD class="bgtabon" width="100%" colSpan=2><img src="/wtlgifs/web_transparent.gif" alt="Transparent Image" CLASS="headerImg" TITLE="Transparent Image"  NAME="web_transparent" HSPACE=0 VSPACE=0 BORDER=0 HEIGHT=2 WIDTH=10 /></TD></tr></table>
<a href="#top" onMouseover="window.status='Skip to top of page'; return true" onMouseout="window.status=''; return true" OnFocus="window.status='Skip to top of page'; return true" onBlur="window.status=''; return true" class="skiplinks">Skip to top of page</a>
</DIV>
<div class="footerbeforediv">

</DIV>
<div class="footerlinksdiv">
<SPAN class="pagefooterlinks">
<map name="Student_Detail_Schedule_Links_F" title="Student Detail Schedule Links">
<p>
<a href="#skip_Student_Detail_Schedule_Links_F" onMouseover="window.status='Skip Student Detail Schedule Links'; return true" onMouseout="window.status=''; return true" onFocus="window.status='Skip Student Detail Schedule Links'; return true" onBlur="window.status=''; return true"  class="skiplinks">Skip Student Detail Schedule Links</a>
<P>[ <a href="/pls/OWA_PROD/bwskflib.P_SelDefTerm" onMouseover="window.status='Select Term'; return true" onMouseout="window.status=''; return true" onFocus="window.status='Select Term'; return true" onBlur="window.status=''; return true" >Select Term</a>
 | <a href="/pls/OWA_PROD/bwskfreg.P_AltPin" onMouseover="window.status='Add/Drop Classes'; return true" onMouseout="window.status=''; return true" onFocus="window.status='Add/Drop Classes'; return true" onBlur="window.status=''; return true" >Add/Drop Classes</a>
 | <a href="/pls/OWA_PROD/bwskfreg.P_ChangeCrseOpt" onMouseover="window.status='Change Class Options'; return true" onMouseout="window.status=''; return true" onFocus="window.status='Change Class Options'; return true" onBlur="window.status=''; return true" >Change Class Options</a>
 | <a href="/pls/OWA_PROD/bzskvate.P_VateaFees" onMouseover="window.status='View Fee Assessment'; return true" onMouseout="window.status=''; return true" onFocus="window.status='View Fee Assessment'; return true" onBlur="window.status=''; return true" >View Fee Assessment</a>
 | <a href="/pls/OWA_PROD/bwskfcls.p_sel_crse_search" onMouseover="window.status='Look-up Classes to Add'; return true" onMouseout="window.status=''; return true" onFocus="window.status='Look-up Classes to Add'; return true" onBlur="window.status=''; return true" >Look-up Classes to Add</a>
 ]
</map>
</SPAN>
<a name="skip_Student_Detail_Schedule_Links_F"></a>
</DIV>
<div class="footerafterdiv">

</DIV>
<div class="globalafterdiv">

</DIV>
<div class="globalfooterdiv">

</DIV>
<div class="pagefooterdiv">
<SPAN class="releasetext">Release: 8.7.1.clp</SPAN>
</DIV>
<div class="poweredbydiv">
</DIV>
<DIV class="div1"></DIV>
<DIV class="div2"></DIV>
<DIV class="div3"></DIV>
<DIV class="div4"></DIV>
<DIV class="div5"></DIV>
<DIV class="div6"></DIV>
<div class="banner_copyright"> <br><h5>© 2023 Ellucian Company L.P. and its affiliates.<br></h5></div>
</body>
</html>

`;

allBtn.addEventListener('click', async () => {
	changeDay("all");
	redrawDots();
});

monBtn.addEventListener('click', async () => {
	changeDay("mon");
	redrawDots();
});

tueBtn.addEventListener('click', async () => {
	changeDay("tue");
	redrawDots();
});

wedBtn.addEventListener('click', async () => {
	changeDay("wed");
	redrawDots();
});

thuBtn.addEventListener('click', async () => {
	changeDay("thu");
	redrawDots();
});

friBtn.addEventListener('click', async () => {
	changeDay("fri");
	redrawDots();
});

parseFile(pageText);

//console.log("\n\ndraw time");
var color = 0;
for(var i = 0; i < classes.length; i++)
{
	var name = classes[i]["name"];
	var times = classes[i]["times"];
	var days = classes[i]["days"];
	var bldg = classes[i]["bldg"];
	var room = classes[i]["room"];
	
	//console.log("class: " + name);
	
	var secondIndex = name.length-1;
	while(name[secondIndex] != "-") secondIndex--;
	var firstIndex = secondIndex - 1;
	while(name[firstIndex] != "-") firstIndex--;
	
	var shortName = name.substring(firstIndex+1, secondIndex-1);
	console.log(shortName);
	
	for(var j = 0; j < times.length; j++)
	{
		if(bldg[j] != "ONLINE")
		{
			//console.log("try: " + classes[i]["bldg"][j]);
			var coords = schoolMap[classes[i]["bldg"][j]];
			
			if(coords == undefined) {
				console.log("unhandeled location");
				continue;
			}			
			//console.log(coords);
			
			for(var k = 0; k < days[j].length; k++)
			{
				//console.log("HERE: " + name + " " + days[j][k]);
				switch(days[j][k])
				{
					case "M":
						addDot(coords[0], coords[1], colorList[color], "mon", shortName);
						break;
					case "T":
						addDot(coords[0], coords[1], colorList[color], "tue", shortName);
						break;
					case "W":
						addDot(coords[0], coords[1], colorList[color], "wed", shortName);
						break;
					case "R":
						addDot(coords[0], coords[1], colorList[color], "thu", shortName);
						break;
					case "F":
						addDot(coords[0], coords[1], colorList[color], "fri", shortName);
						break;						
				}
			}
		}
	}
	color++;
}
redrawDots();
