[custom]
全球直连,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/LocalAreaNetwork.list
ruleset=🎯 全球直连,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/UnBan.list
ruleset=🛑 广告拦截,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanAD.list
ruleset=🎯 全球直连,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/GoogleCN.list
ruleset=🎯 全球直连,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/SteamCN.list
ruleset=🤖 AI,https://raw.githubusercontent.com/iloveyam/ClashRules/refs/heads/main/AI.list
ruleset=📹 YouTube,https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/youtube.mrs
ruleset=🍀 Google,https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/google.mrs
ruleset=🐬 OneDrive,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/OneDrive/OneDrive.list
ruleset=🪟 Microsoft,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Microsoft.list
ruleset=🍎 Apple,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Apple.list
ruleset=📲 Telegram,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Telegram/Telegram.list
ruleset=🎥 Netflix,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Netflix.list
ruleset=🎵 Spotify,https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/spotify.mrs
ruleset=🎵 TikTok,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/TikTok/TikTok.list
ruleset=📢 FCM,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/GoogleFCM/GoogleFCM.list
ruleset=🎮 游戏平台,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Epic.list
ruleset=🎮 游戏平台,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Origin.list
ruleset=🎮 游戏平台,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Sony.list
ruleset=🎮 游戏平台,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Steam.list
ruleset=🎮 游戏平台,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Nintendo.list
ruleset=🎞️ 国内媒体,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMedia/ChinaMedia.list
ruleset=🌍 国外媒体,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyMedia.list
ruleset=🍃 应用净化,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/BanProgramAD.list
ruleset=🚀 节点选择,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list
ruleset=🎯 全球直连,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaDomain.list
ruleset=🎯 全球直连,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ChinaCompanyIp.list
ruleset=🎯 全球直连,https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Download.list
ruleset=🎯 全球直连,https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/China/China.list
ruleset=🎯 全球直连,[]GEOSITE,CN
ruleset=🚀 节点选择,[]GEOSITE,geolocation-!cn
ruleset=🎯 全球直连,[]GEOIP,CN
ruleset=🐟 漏网之鱼,[]FINAL

;策略组定义
custom_proxy_group=♻️ 自动选择`url-test`.*`http://www.gstatic.com/generate_204`300,,100
custom_proxy_group=🚀 节点选择`select`[]🇭🇰 香港节点`[]🇯🇵 日本节点`[]🇸🇬 新加坡节点`[]🇺🇲 美国节点`[]🌐 其他地区`[]🐸 手动切换`[]DIRECT
custom_proxy_group=🤖 AI`select`[]🚀 节点选择`[]🇺🇲 美国节点`[]🇯🇵 日本节点`[]🇸🇬 新加坡节点`[]🇭🇰 香港节点`[]DIRECT
custom_proxy_group=🍀 Google`select`[]🚀 节点选择`[]🇺🇲 美国节点`[]🇭🇰 香港节点`[]🇯🇵 日本节点`[]🇸🇬 新加坡节点`[]🌐 其他地区`[]🐸 手动切换`[]DIRECT
custom_proxy_group=📹 YouTube`select`[]🚀 节点选择`[]🇭🇰 香港节点`[]🇯🇵 日本节点`[]🇸🇬 新加坡节点`[]🇺🇲 美国节点`[]🌐 其他地区`[]🐸 手动切换`[]DIRECT
custom_proxy_group=🐬 OneDrive`select`[]🚀 节点选择`[]🇭🇰 香港节点`[]🇯🇵 日本节点`[]🇸🇬 新加坡节点`[]🇺🇲 美国节点`[]🌐 其他地区`[]🐸 手动切换`[]DIRECT
custom_proxy_group=🪟 Microsoft`select`[]🚀 节点选择`[]🇭🇰 香港节点`[]🇯🇵 日本节点`[]🇸🇬 新加坡节点`[]🇺🇲 美国节点`[]🌐 其他地区`[]🐸 手动切换`[]DIRECT
custom_proxy_group=🍎 Apple`select`[]🚀 节点选择`[]🇭🇰 香港节点`[]🇯🇵 日本节点`[]🇸🇬 新加坡节点`[]🇺🇲 美国节点`[]🌐 其他地区`[]🐸 手动切换`[]DIRECT
custom_proxy_group=🎵 Spotify`select`[]🚀 节点选择`[]🇭🇰 香港节点`[]🇯🇵 日本节点`[]🇸🇬 新加坡节点`[]🇺🇲 美国节点`[]🌐 其他地区`[]🐸 手动切换`[]DIRECT
custom_proxy_group=🎵 TikTok`select`[]🚀 节点选择`[]🇭🇰 香港节点`[]🇯🇵 日本节点`[]🇸🇬 新加坡节点`[]🇺🇲 美国节点`[]🌐 其他地区`[]🐸 手动切换`[]DIRECT
custom_proxy_group=🎥 Netflix`select`[]🚀 节点选择`[]🇭🇰 香港节点`[]🇯🇵 日本节点`[]🇸🇬 新加坡节点`[]🇺🇲 美国节点`[]🌐 其他地区`[]🐸 手动切换`[]DIRECT
custom_proxy_group=📲 Telegram`select`[]🚀 节点选择`[]🇭🇰 香港节点`[]🇯🇵 日本节点`[]🇸🇬 新加坡节点`[]🇺🇲 美国节点`[]🌐 其他地区`[]🐸 手动切换`[]DIRECT
custom_proxy_group=📢 FCM`select`[]🚀 节点选择`[]🇭🇰 香港节点`[]🇯🇵 日本节点`[]🇸🇬 新加坡节点`[]🇺🇲 美国节点`[]🌐 其他地区`[]🐸 手动切换`[]DIRECT
custom_proxy_group=🎮 游戏平台`select`[]🚀 节点选择`[]🇭🇰 香港节点`[]🇯🇵 日本节点`[]🇸🇬 新加坡节点`[]🇺🇲 美国节点`[]🌐 其他地区`[]🐸 手动切换`[]DIRECT
custom_proxy_group=🌍 国外媒体`select`[]🚀 节点选择`[]🇭🇰 香港节点`[]🇯🇵 日本节点`[]🇸🇬 新加坡节点`[]🇺🇲 美国节点`[]🌐 其他地区`[]🐸 手动切换`[]DIRECT
custom_proxy_group=🎞️ 国内媒体`select`[]DIRECT`[]🚀 节点选择`[]🐸 手动切换
custom_proxy_group=🎯 全球直连`select`[]DIRECT`[]🚀 节点选择`[]🐸 手动切换
custom_proxy_group=🛑 广告拦截`select`[]REJECT`[]DIRECT
custom_proxy_group=🍃 应用净化`select`[]REJECT`[]DIRECT
custom_proxy_group=🐟 漏网之鱼`select`[]🚀 节点选择`[]🇭🇰 香港节点`[]🇯🇵 日本节点`[]🇸🇬 新加坡节点`[]🇺🇲 美国节点`[]🌐 其他地区`[]🐸 手动切换`[]DIRECT
custom_proxy_group=🐸 手动切换`select`.*
custom_proxy_group=🇭🇰 香港节点`select`(?=.*(香港|HK|Hong Kong|🇭🇰|HongKong))^((?!(深港|US|家宽|游戏|剩余|流量|2.0|2倍|2x|3.0|3倍|3x|4.0|4倍|4x)).)*$
custom_proxy_group=🇯🇵 日本节点`select`(?=.*(日本|川日|东京|大阪|泉日|埼玉|沪日|深日|JP|Japan))^((?!(家宽|游戏|剩余|流量|2.0|2倍|2x|3.0|3倍|3x|4.0|4倍|4x)).)*$
custom_proxy_group=🇸🇬 新加坡节点`select`(?=.*(新加坡|坡|狮城|SG|Singapore))^((?!(家宽|游戏|剩余|流量|2.0|2倍|2x|3.0|3倍|3x|4.0|4倍|4x)).)*$
custom_proxy_group=🇺🇲 美国节点`select`(美|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|US|United States)
custom_proxy_group=🌐 其他地区`select`(^(?!.*(香港|HK|Hong Kong|🇭🇰|HongKong|日本|川日|东京|大阪|泉日|埼玉|沪日|深日|JP|Japan|新加坡|坡|狮城|SG|Singapore)).*)
custom_proxy_group=🎥 奈飞节点`select`(NF|奈飞|解锁|Netflix|NETFLIX|Media)

;启用自定义规则集

enable_rule_generator=true
overwrite_original_rules=true
