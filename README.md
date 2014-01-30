# CSS Browser Selector

CSS Browser Selector is a very small javascript which empowers CSS selectors.  
You can now write code for: browser, browser version, platform, platform version, device, device version.  
Best part: no more hacks; all compliant code.  
More info: [http://rafael.adm.br/css_browser_selector](http://rafael.adm.br/css_browser_selector)  
beta/experimental versions: [https://github.com/verbatim/css_browser_selector/](https://github.com/verbatim/css_browser_selector/)  

###Identifies
* browsers: Firefox; IE; Opera; Safari; Chrome, Konqueror, Iron  
* browser versions: (most importantly: ie6, ie7, ie8, ie9)  
* rendering engines: Webkit; Mozilla; Gecko  
* platforms/OSes: Mac; Win: Win8, Win7, Vista, WinXP, Win2k, WinNT; FreeBSD; Linux/x11  
* devices: Ipod; Ipad; Iphone; Blackberry; Android; J2me; RIM Playbook; mobile (generic)  
* enabled technology: JS (use in conjunction with &lt;html class="no-js"> for even more granular control)  
* language detection  

## Example

    <style type="text/css"> 
	    .ie .example { background-color: yellow; }
	    .ie7 .example { background-color: orange }
	    .gecko .example { background-color: gray; }
	    .win.gecko .example { background-color: red; }
	    .linux.gecko .example { background-color: pink; }
	    .opera .example { background-color: green; }
	    .konqueror .example { background-color: blue; }
	    .webkit .example { background-color: black; }
	    .chrome .example { background-color: cyan; }
	    .example { width: 100px; height: 100px; }
	    .no-js, .no_js, .nojs { display: block; }
	    .js { display: none; }
    </style>

## Versions

### 1.0.1
* Refactoring with introduction of Matcher and MatcherGroup objects.
* Moved test cases to Jasmine
* Added test cases covering newer Safari/Chrome/FF/IE
* Removal of screen size classes
* Added optional arguments to allow attaching classes to elements other than body and defining custom UA matchers.
* Added gruntfile

## Options  

		css_browser_selector(userAgent, element, userMatchers);

* userAgent  
optional: Specify a user agent string to parse. If no user agent is specified, navigator.userAgent is used instead
* element  
optional: Specify which element to attach the classes to. If not specified, these will be attached to \<html\>.
* userMatchers  
optional: Define additional matchers for assigning classes. See source for examples.


## Resources

navigator.userAgent strings:  
http://en.wikipedia.org/wiki/User_agent
http://www.useragentstring.com/pages/useragentstring.php  
http://www.user-agents.org  
http://www.zytrax.com/tech/web/mobile_ids.html

history of the user agent string:  
http://www.nczonline.net/blog/2010/01/12/history-of-the-user-agent-string/

language list:  
http://msdn.microsoft.com/en-us/library/ms533052%28v=vs.85%29.aspx

windows nt list  
http://en.wikipedia.org/wiki/Windows_NT

blackberry user agent string interpertation:  
http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/How-to-detect-the-BlackBerry-Browser/ta-p/559862

javascript compression:  
http://minifyjavascript.com

screen resolutions:  
http://cartoonized.net/cellphone-screen-resolution.php

aspect ratio:  
http://www.htmlgoodies.com/beyond/webmaster/toolbox/article.php/3889591/Detect-and-Set-the-iPhone--iPads-Viewport-Orientation-Using-JavaScript-CSS-and-Meta-Tags.htm

iOS detection?:  
http://stackoverflow.com/questions/4460205/detect-ipad-iphone-webview-via-javascript


## Other Versions

**Ruby on Rails Plugin by Reid MacDonald**  
http://latimes.rubyforge.org/svn/plugins/css_browser_selector/

**PHP CSS Browser Selector by Bastian Allgeier**  
http://bastian-allgeier.de/css_browser_selector/

**Wordpress Plugin by Adrian hanft**  
http://wordpress.org/extend/plugins/browser-specific-css/


###License:  
http://creativecommons.org/licenses/by/2.5/

###Original Author:  
Rafael Lima:  
http://rafael.adm.br

Based on idea by 37signals:  
http://37signals.com/svn/archives2/browser_selectors_in_css.php

###Contributors:  
Niyaz (http://github.com/niyazpk)  
Marcio Trindade (http://github.com/marciotrindade)  
rbottarelli (http://github.com/rbottarelli)  
Bryan Chow (http://github.com/bryanchow)  
Derek Lio (http://github.com/dereklio)  
Paul Irish (http://github.com/paulirish)  
Preston Badeer  
Upekshapriya  
André Lopes  
Tazio Mirandola - copiaincolla pubblicità  
Reid MacDonald (http://geminstallthat.wordpress.com)  
Vinicius Braga (http://viniciusbraga.com)  
Chris Preece (http://www.mmtdigital.co.uk)  
Dominykas  
M@ McCray  
Daniel Westermann-Clark  
Steve Clay (http://mrclay.org/)  
Jeff Bellsey  
Jean Pierre  
Micah Snyder  
Derek (http://amphibian.info)  
Jesse Scott  
Moises Kirsch (http://www.moiblog.com/)  
Alex Wiltschko  
Chris Warren and Tony Nelson (http://www.imagetrend.com)  
glasser
