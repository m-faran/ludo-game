import * as React from "react";
import {StyleSheet, View, Image, Text, TouchableOpacity} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = ({ username, onPlayOnline, onPlayVsComputer, onPassNPlay, onPlayWithFriends, onSettings }) => {
  	
  	return (
    		<View style={styles.homeScreen}>
      			<Image style={[styles.glowRedTlIcon, styles.glowIconPosition1]} resizeMode="cover" />
      			<Image style={[styles.glowBlueTrIcon, styles.glowIconPosition1]} resizeMode="cover" />
      			<Image style={[styles.glowGreenBlIcon, styles.glowIconPosition]} resizeMode="cover" />
      			<Image style={[styles.glowYellowBrIcon, styles.glowIconPosition]} resizeMode="cover" />
      			<View style={[styles.rectangle, styles.rectangleLayout]} />
      			<Image style={styles.starIcon} resizeMode="cover" />
      			<View style={[styles.statusBar, styles.topHudFlexBox]}>
        				<Text style={styles.text}>9:41</Text>
        				<View style={styles.frame}>
          					<Image style={styles.iconLayout2} resizeMode="cover" />
          					<Image style={styles.iconLayout2} resizeMode="cover" />
          					<Image style={styles.iosBatteryFullIcon} resizeMode="cover" />
        				</View>
      			</View>
      			<View style={styles.topHudGroup}>
        				<View style={[styles.topHud, styles.topHudPosition]}>
          					<View style={styles.profileSectionFrame}>
            						<Image style={styles.profileImageIcon} resizeMode="cover" />
            						<View style={styles.nameAndLevel}>
              							<Text style={[styles.kingRoll99, styles.rollTypo]}>{username || 'Guest'}</Text>
              							<View style={[styles.levelFrame, styles.btnStoreFlexBox]}>
                								<View style={styles.rectangle2} />
                								<Text style={[styles.lvl12, styles.lvl12Typo]}>LVL 12</Text>
              							</View>
            						</View>
          					</View>
          					<View style={styles.coinsXpFrame}>
            						<View style={styles.coinsFrame}>
              							<Image style={styles.rectangleLayout} resizeMode="cover" />
              							<Text style={[styles.text2, styles.lvl12Typo]}>12,500</Text>
            						</View>
            						<View style={styles.coinsFrame}>
              							<Image style={styles.rectangleLayout} resizeMode="cover" />
              							<Text style={[styles.text2, styles.lvl12Typo]}>350</Text>
            						</View>
          					</View>
        				</View>
      			</View>
      			<View style={styles.logoContainer}>
        				<View style={styles.badgeOuter}>
          					<View style={[styles.logoTextTop, styles.logoPosition]}>
            						<Text style={[styles.ludo20, styles.ludo20Typo]}>LUDO 2.0</Text>
          					</View>
          					<Image style={styles.centralDice3dIcon} resizeMode="cover" />
          					<View style={[styles.logoTextBottom, styles.logoPosition]}>
            						<Text style={[styles.powerups, styles.ludo20Typo]}>POWERUPS</Text>
          					</View>
        				</View>
      			</View>
      			<View style={styles.taglineContainer}>
        				<Text style={[styles.rollMoveConquerContainer, styles.rollTypo]}>
          					<Text style={styles.roll}>{`Roll. `}</Text>
          					<Text style={styles.move}>{`Move. `}</Text>
          					<Text style={styles.roll}>Conquer.</Text>
        				</Text>
      			</View>
      			<View style={styles.buttonStackGroup}>
        				<View style={styles.playOptions}>
                  <TouchableOpacity activeOpacity={0.8} onPress={onPlayOnline}>
          					<LinearGradient style={[styles.btnPlayOnline, styles.btnBorder]} locations={[0,1]} colors={['#ffcc00','#ff8800']} useAngle={true} angle={90}>
            						<View style={styles.btnContent}>
              							<View style={styles.iconContainer}>
                								<Image style={styles.iconLayout1} resizeMode="cover" />
              							</View>
              							<View style={styles.textContainer}>
                								<Text style={[styles.playOnline, styles.playOnlineText1]}>Play Online</Text>
                								<Text style={[styles.matchWithGlobal, styles.playOnlineText1]}>Match with global players</Text>
              							</View>
            						</View>
          					</LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} onPress={onPlayVsComputer}>
          					<LinearGradient style={[styles.btnPlayVsComputer, styles.btnBorder]} locations={[0,1]} colors={['#ff453a','#990011']} useAngle={true} angle={90}>
            						<View style={styles.btnContent}>
              							<View style={styles.iconContainer1}>
                								<Image style={styles.iconLayout1} resizeMode="cover" />
              							</View>
              							<View style={styles.textContainer}>
                								<Text style={[styles.playOnline, styles.playOnlineText1]}>Play Vs Computer</Text>
                								<Text style={[styles.matchWithGlobal, styles.playOnlineText1]}>Practice offline mode</Text>
              							</View>
            						</View>
          					</LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} onPress={onPassNPlay}>
          					<LinearGradient style={[styles.btnPassNPlay, styles.btnBorder]} locations={[0,1]} colors={['#30d158','#0a6629']} useAngle={true} angle={90}>
            						<View style={styles.btnContent}>
              							<View style={styles.iconContainer2}>
                								<Image style={styles.iconLayout1} resizeMode="cover" />
              							</View>
              							<View style={styles.textContainer}>
                								<Text style={[styles.playOnline, styles.playOnlineText1]}>Pass N Play</Text>
                								<Text style={[styles.matchWithGlobal, styles.playOnlineText1]}>Local couch multiplayer</Text>
              							</View>
            						</View>
          					</LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} onPress={onPlayWithFriends}>
          					<LinearGradient style={[styles.btnPlayWithFriends, styles.btnBorder]} locations={[0,1]} colors={['#0a84ff','#0040aa']} useAngle={true} angle={90}>
            						<View style={styles.btnContent}>
              							<View style={styles.iconContainer3}>
                								<Image style={styles.iconLayout1} resizeMode="cover" />
              							</View>
              							<View style={styles.textContainer}>
                								<Text style={[styles.playOnline, styles.playOnlineText1]}>Play With Friends</Text>
                								<Text style={[styles.matchWithGlobal, styles.playOnlineText1]}>Custom private lobby</Text>
              							</View>
            						</View>
          					</LinearGradient>
                  </TouchableOpacity>
        				</View>
      			</View>
      			<View style={styles.bottomNavigationGroup}>
        				<View style={[styles.bottomDockContainer, styles.homeIndicatorBg]}>
          					<View style={styles.btnStoreFlexBox}>
            						<View style={[styles.iconShoppingBag, styles.iconLayout]}>
              							<Image style={styles.iconLayout} resizeMode="cover" />
            						</View>
            						<Text style={[styles.store, styles.storeFlexBox]}>STORE</Text>
          					</View>
          					<View style={styles.btnStoreFlexBox}>
            						<View style={[styles.iconShoppingBag, styles.iconLayout]}>
              							<Image style={styles.iconLayout} resizeMode="cover" />
            						</View>
            						<Text style={[styles.store, styles.storeFlexBox]}>POWERUPS</Text>
          					</View>
          					<View style={styles.btnStoreFlexBox}>
            						<View style={[styles.iconShoppingBag, styles.iconLayout]}>
              							<Image style={styles.iconLayout} resizeMode="cover" />
            						</View>
            						<Text style={[styles.store, styles.storeFlexBox]}>SKINS</Text>
          					</View>
          				<View style={styles.bottomNavInner}>
                  <TouchableOpacity activeOpacity={0.8} onPress={onSettings} style={[styles.btnStore, styles.btnStoreFlexBox]}>
          					<View style={styles.gLogoContainerPosition}>
            						<Image style={[styles.icon, styles.iconLayout]} resizeMode="cover" />
          					</View>
          					<Text style={[styles.store, styles.storeFlexBox]}>SETTINGS</Text>
                  </TouchableOpacity>
        				</View>
      			</View>
      			</View>
      			<View style={[styles.homeIndicator, styles.homeIndicatorBg]}>
        				<View style={styles.indicatorBar} />
      			</View>
    		</View>);
};

const styles = StyleSheet.create({
  	glowIconPosition1: {
    		opacity: 0,
    		filter: "blur(80px)",
    		top: -80,
    		height: 240,
    		width: 240,
    		position: "absolute"
  	},
  	glowIconPosition: {
    		top: 700,
    		opacity: 0,
    		filter: "blur(80px)",
    		position: "absolute",
    		height: 240,
    		width: 240
  	},
  	rectangleLayout: {
    		height: 12,
    		width: 12
  	},
  	topHudFlexBox: {
    		gap: 20,
    		paddingVertical: 0,
    		justifyContent: "space-between",
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	topHudPosition: {
    		width: 402,
    		left: 0,
    		top: 0,
    		position: "absolute"
  	},
  	rollTypo: {
    		fontFamily: "Outfit-ExtraBold",
    		fontWeight: "800",
    		textAlign: "left"
  	},
  	btnStoreFlexBox: {
    		gap: 4,
    		alignItems: "center"
  	},
  	lvl12Typo: {
    		fontWeight: "700",
    		fontFamily: "Geist"
  	},
  	logoPosition: {
    		left: "50%",
    		alignSelf: "center",
    		alignItems: "center",
    		position: "absolute"
  	},
  	ludo20Typo: {
    		fontFamily: "Outfit-Black",
    		fontWeight: "900",
    		color: "#fff"
  	},
  	btnBorder: {
    		backgroundColor: "transparent",
    		borderColor: "rgba(255, 255, 255, 0.2)",
    		borderRadius: 24,
    		elevation: 16,
    		height: 72,
    		borderWidth: 1,
    		borderStyle: "solid",
    		gap: 20,
    		paddingVertical: 0,
    		paddingHorizontal: 24,
    		justifyContent: "space-between",
    		alignItems: "center",
    		flexDirection: "row",
    		alignSelf: "stretch"
  	},
  	iconLayout1: {
    		width: 24,
    		height: 24
  	},
  	playOnlineText1: {
    		textTransform: "uppercase",
    		alignSelf: "flex-start",
    		textAlign: "left"
  	},
  	iconLayout2: {
    		width: 20,
    		height: 20
  	},
  	homeIndicatorBg: {
    		backgroundColor: "#0d0d1b",
    		alignItems: "center"
  	},
  	iconLayout: {
    		height: 22,
    		width: 22
  	},
  	storeFlexBox: {
    		alignSelf: "center",
    		textAlign: "left"
  	},
  	homeScreen: {
    		flex: 1,
    		width: "100%",
    		overflow: "hidden",
    		minHeight: 874,
    		alignItems: "flex-start",
    		backgroundColor: "#07070e"
  	},
  	glowRedTlIcon: {
    		zIndex: 0,
    		left: -80
  	},
  	glowBlueTrIcon: {
    		zIndex: 1,
    		left: 240
  	},
  	glowGreenBlIcon: {
    		zIndex: 2,
    		left: -80
  	},
  	glowYellowBrIcon: {
    		zIndex: 3,
    		left: 240
  	},
  	rectangle: {
    		top: 150,
    		left: 330,
    		borderRadius: 2,
    		backgroundColor: "#007aff",
    		transform: [
      			{
        				rotate: "45deg"
      			}
    		],
    		opacity: 1,
    		zIndex: 4,
    		position: "absolute"
  	},
  	starIcon: {
    		width: 16.91,
    		height: 16.91,
    		top: 320,
    		left: 52.29,
    		opacity: 1,
    		zIndex: 5,
    		position: "absolute"
  	},
  	statusBar: {
    		zIndex: 6,
    		paddingHorizontal: 24,
    		height: 44,
    		alignSelf: "stretch"
  	},
  	text: {
    		fontFamily: "Inter-SemiBold",
    		textAlign: "left",
    		color: "#fff",
    		fontWeight: "600",
    		fontSize: 14
  	},
  	frame: {
    		gap: 6,
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	iosBatteryFullIcon: {
    		width: 28,
    		height: 20
  	},
  	topHudGroup: {
    		zIndex: 7,
    		height: 56,
    		alignSelf: "stretch"
  	},
  	topHud: {
    		paddingHorizontal: 20,
    		height: 56,
    		gap: 20,
    		paddingVertical: 0,
    		justifyContent: "space-between",
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	profileSectionFrame: {
    		gap: 10,
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	profileImageIcon: {
    		height: 38,
    		width: 38,
    		borderRadius: 19
  	},
  	nameAndLevel: {
    		gap: 2,
    		alignItems: "flex-start"
  	},
  	kingRoll99: {
    		alignSelf: "flex-start",
    		color: "#fff",
    		fontSize: 14
  	},
  	levelFrame: {
    		alignSelf: "flex-start",
    		flexDirection: "row"
  	},
  	rectangle2: {
    		height: 6,
    		width: 36,
    		backgroundColor: "rgba(255, 255, 255, 0.2)",
    		borderRadius: 3
  	},
  	lvl12: {
    		fontSize: 9,
    		color: "#ffcc00",
    		fontFamily: "Geist",
    		textAlign: "left"
  	},
  	coinsXpFrame: {
    		gap: 8,
    		flexDirection: "row",
    		alignItems: "flex-start"
  	},
  	coinsFrame: {
    		borderRadius: 12,
    		backgroundColor: "rgba(255, 255, 255, 0.06)",
    		paddingHorizontal: 7,
    		paddingVertical: 3,
    		borderWidth: 1,
    		borderColor: "rgba(255, 255, 255, 0.1)",
    		borderStyle: "solid",
    		gap: 4,
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	text2: {
    		fontSize: 12,
    		fontFamily: "Geist",
    		textAlign: "left",
    		color: "#fff"
  	},
  	logoContainer: {
    		paddingTop: 20,
    		paddingBottom: 10,
    		zIndex: 8,
    		alignItems: "center",
    		alignSelf: "stretch"
  	},
  	badgeOuter: {
    		width: 180,
    		height: 180,
    		boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.7)",
    		elevation: 24,
    		borderRadius: 90,
    		borderColor: "#fff",
    		borderWidth: 4,
    		justifyContent: "center",
    		borderStyle: "solid",
    		alignItems: "center",
    		backgroundColor: "#07070e"
  	},
  	logoTextTop: {
    		marginLeft: -41,
    		top: 20,
    		zIndex: 0
  	},
  	ludo20: {
    		fontSize: 18,
    		alignSelf: "center",
    		textAlign: "left"
  	},
  	centralDice3dIcon: {
    		width: 85.4,
    		height: 85.4,
    		boxShadow: "4px 8px 12px rgba(0, 0, 0, 0.4)",
    		borderRadius: 18,
    		zIndex: 1
  	},
  	logoTextBottom: {
    		marginLeft: -40,
    		top: 140,
    		zIndex: 2
  	},
  	powerups: {
    		alignSelf: "center",
    		textAlign: "left",
    		fontSize: 14
  	},
  	taglineContainer: {
    		paddingBottom: 32,
    		zIndex: 9,
    		justifyContent: "center",
    		flexDirection: "row",
    		alignSelf: "stretch",
    		alignItems: "flex-start"
  	},
  	rollMoveConquerContainer: {
    		fontSize: 20
  	},
  	roll: {
    		color: "#fff"
  	},
  	move: {
    		color: "#ffcc00"
  	},
  	buttonStackGroup: {
    		height: 376,
    		zIndex: 10,
    		alignSelf: "stretch"
  	},
  	buttonsStack: {
    		paddingBottom: 40,
    		gap: 16,
    		paddingHorizontal: 24,
    		alignItems: "flex-start"
  	},
  	btnPlayOnline: {
    		boxShadow: "0px 8px 16px rgba(255, 136, 0, 0.3)"
  	},
  	frame2: {
    		gap: 16,
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	frame3: {
    		width: 44,
    		borderRadius: 14,
    		backgroundColor: "rgba(0, 0, 0, 0.3)",
    		justifyContent: "center",
    		alignItems: "center",
    		flexDirection: "row",
    		height: 44
  	},
  	iconGlobe: {
    		justifyContent: "center",
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	playOnline: {
    		fontSize: 20,
    		fontFamily: "Outfit-Black",
    		fontWeight: "900",
    		color: "#fff"
  	},
  	matchWithGlobal: {
    		fontSize: 11,
    		color: "rgba(255, 255, 255, 0.82)",
    		fontFamily: "Geist",
    		fontWeight: "600"
  	},
  	iconChevronRight: {
    		justifyContent: "center",
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	btnPlayVsComputer: {
    		boxShadow: "0px 8px 16px rgba(153, 0, 17, 0.3)"
  	},
  	btnPassNPlay: {
    		boxShadow: "0px 8px 16px rgba(10, 102, 41, 0.3)"
  	},
  	btnPlayWithFriends: {
    		boxShadow: "0px 8px 16px rgba(0, 64, 170, 0.3)"
  	},
  	bottomNavigationGroup: {
    		zIndex: 11,
    		height: 80,
    		alignSelf: "stretch"
  	},
  	bottomDockContainer: {
    		borderTopWidth: 1,
    		paddingHorizontal: 32,
    		paddingBottom: 12,
    		height: 80,
    		borderColor: "rgba(255, 255, 255, 0.1)",
    		backgroundColor: "#0d0d1b",
    		borderStyle: "solid",
    		width: 402,
    		left: 0,
    		top: 0,
    		gap: 20,
    		justifyContent: "space-between",
    		flexDirection: "row",
    		position: "absolute"
  	},
  	iconShoppingBag: {
    		justifyContent: "center",
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	store: {
    		fontSize: 10,
    		color: "#a0a0c0",
    		fontFamily: "Geist",
    		fontWeight: "700"
  	},
  	homeIndicator: {
    		height: 16,
    		zIndex: 12,
    		justifyContent: "center",
    		alignSelf: "stretch"
  	},
  	indicatorBar: {
    		width: 134,
    		height: 5,
    		backgroundColor: "#fff",
    		opacity: 0,
    		borderRadius: 3
  	}
});

export default HomeScreen;
