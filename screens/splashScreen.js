import * as React from "react";
import {StyleSheet, Image, Text, View, TouchableOpacity} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SplashScreen = ({ onPlay }) => {
  	
  	return (
    		<LinearGradient style={styles.splashScreen} locations={[0,1]} colors={['#0a0b12','#141727']} useAngle={true} angle={180}>
      			<Image style={[styles.redGlowIcon, styles.glowIconLayout1]} resizeMode="cover" />
      			<Image style={[styles.greenGlowIcon, styles.glowIconLayout1]} resizeMode="cover" />
      			<Image style={[styles.blueGlowIcon, styles.glowIconLayout]} resizeMode="cover" />
      			<Image style={[styles.yellowGlowIcon, styles.glowIconLayout]} resizeMode="cover" />
      			<Image style={[styles.energyLine1Icon, styles.energyIconLayout]} resizeMode="cover" />
      			<Image style={styles.energyLine2Icon} resizeMode="cover" />
      			<Image style={[styles.energyLine3Icon, styles.energyIconLayout]} resizeMode="cover" />
      			<Image style={styles.floatingDice1Icon} resizeMode="cover" />
      			<Image style={[styles.floatingPawnIcon, styles.floatingIconPosition]} resizeMode="cover" />
      			<Image style={styles.floatingDice2Icon} resizeMode="cover" />
      			<Image style={[styles.floatingPawnIcon2, styles.floatingIconPosition]} resizeMode="cover" />
      			<Image style={[styles.floatingPawnIcon3, styles.floatingIconPosition]} resizeMode="cover" />
      			<Image style={[styles.sparkleIcon, styles.iconLayout1]} resizeMode="cover" />
      			<Image style={[styles.sparkleIcon2, styles.iconLayout]} resizeMode="cover" />
      			<Image style={styles.starIcon} resizeMode="cover" />
      			<Image style={styles.sparkleIcon3} resizeMode="cover" />
      			<View style={[styles.mainContainer, styles.mainContainerPosition]}>
        				<View style={[styles.statusBar, styles.statusBarFlexBox]}>
          					<Text style={styles.text}>9:41</Text>
          					<View style={styles.frame}>
            						<Image style={[styles.iosSignalIcon, styles.iconLayout]} resizeMode="cover" />
            						<Image style={[styles.iosSignalIcon, styles.iconLayout]} resizeMode="cover" />
            						<Image style={styles.iosBatteryFullIcon} resizeMode="cover" />
          					</View>
        				</View>
        				<View style={[styles.brandingArea, styles.playButtonFlexBox]}>
          					<Image style={styles.ludoLogoIcon} resizeMode="cover" />
          					<View style={[styles.taglineContainer, styles.playButtonBorder]}>
            						<Text style={[styles.tagline, styles.taglineTypo]}>
              							<Text style={styles.roll}>{`Roll. `}</Text>
              							<Text style={styles.move}>{`Move. `}</Text>
              							<Text style={styles.conquer}>Conquer.</Text>
            						</Text>
          					</View>
        				</View>
        				<View style={[styles.ctaSection, styles.statusBarFlexBox]}>
          					<TouchableOpacity activeOpacity={0.8} onPress={onPlay}>
                      <LinearGradient style={[styles.playButton, styles.playButtonBorder]} locations={[0,1]} colors={['#ffe600','#ff9900']} useAngle={true} angle={90}>
            						<Image style={styles.iconLayout1} resizeMode="cover" />
            						<Text style={[styles.ctaText, styles.taglineTypo]}>PLAY NOW</Text>
          					  </LinearGradient>
                    </TouchableOpacity>
          					<Text style={styles.tapToPlayHint}>Tap to begin your adventure</Text>
        				</View>
      			</View>
      			<View style={[styles.homeIndicator, styles.playButtonFlexBox]}>
        				<View style={styles.indicatorBar} />
      			</View>
    		</LinearGradient>);
};

const styles = StyleSheet.create({
  	glowIconLayout1: {
    		height: 260,
    		width: 260,
    		filter: "blur(100px)",
    		position: "absolute"
  	},
  	glowIconLayout: {
    		height: 280,
    		width: 280,
    		filter: "blur(100px)",
    		position: "absolute"
  	},
  	energyIconLayout: {
    		height: 344.15,
    		width: 491.49,
    		position: "absolute"
  	},
  	floatingIconPosition: {
    		filter: "drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.4))",
    		position: "absolute"
  	},
  	iconLayout1: {
    		height: 24,
    		width: 24
  	},
  	iconLayout: {
    		width: 20,
    		height: 20
  	},
  	mainContainerPosition: {
    		left: 0,
    		bottom: 0,
    		position: "absolute"
  	},
  	statusBarFlexBox: {
    		gap: 20,
    		alignSelf: "stretch",
    		alignItems: "center"
  	},
  	playButtonFlexBox: {
    		justifyContent: "center",
    		alignItems: "center"
  	},
  	playButtonBorder: {
    		borderStyle: "solid",
    		flexDirection: "row"
  	},
  	taglineTypo: {
    		fontFamily: "Bricolage Grotesque",
    		textAlign: "left"
  	},
  	splashScreen: {
    		height: 844,
    		width: "100%",
    		overflow: "hidden",
    		backgroundColor: "transparent"
  	},
  	redGlowIcon: {
    		opacity: 0,
    		left: -100,
    		top: 150
  	},
  	greenGlowIcon: {
    		top: 80,
    		left: 230,
    		opacity: 0
  	},
  	blueGlowIcon: {
    		top: 550,
    		left: -80,
    		opacity: 0
  	},
  	yellowGlowIcon: {
    		left: 210,
    		top: 600,
    		opacity: 0
  	},
  	energyLine1Icon: {
    		top: 200,
    		opacity: 0,
    		left: -100
  	},
  	energyLine2Icon: {
    		top: 450,
    		left: -150,
    		width: 573.41,
    		height: 401.5,
    		opacity: 0,
    		position: "absolute"
  	},
  	energyLine3Icon: {
    		left: -50,
    		opacity: 0,
    		top: 600
  	},
  	floatingDice1Icon: {
    		top: 240.22,
    		left: 24,
    		filter: "drop-shadow(0px 12px 20px rgba(0, 0, 0, 0.5))",
    		width: 80.64,
    		height: 80.64,
    		position: "absolute"
  	},
  	floatingPawnIcon: {
    		top: 480,
    		left: 26.28,
    		width: 64.91,
    		height: 64.91
  	},
  	floatingDice2Icon: {
    		top: 460,
    		left: 279.66,
    		filter: "drop-shadow(0px 10px 16px rgba(0, 0, 0, 0.5))",
    		width: 66.01,
    		height: 66.01,
    		position: "absolute"
  	},
  	floatingPawnIcon2: {
    		top: 221.06,
    		left: 310,
    		width: 51,
    		height: 51
  	},
  	floatingPawnIcon3: {
    		top: 611,
    		left: 280,
    		width: 79.23,
    		height: 79.23
  	},
  	sparkleIcon: {
    		left: 60,
    		opacity: 1,
    		top: 150,
    		position: "absolute"
  	},
  	sparkleIcon2: {
    		top: 160,
    		left: 320,
    		opacity: 1,
    		height: 20,
    		position: "absolute"
  	},
  	starIcon: {
    		top: 380,
    		left: 300,
    		width: 16,
    		height: 16,
    		opacity: 1,
    		position: "absolute"
  	},
  	sparkleIcon3: {
    		top: 580,
    		left: 32,
    		height: 28,
    		opacity: 1,
    		width: 28,
    		position: "absolute"
  	},
  	mainContainer: {
    		top: 0,
    		right: 0,
    		gap: 0,
    		justifyContent: "space-between",
    		alignItems: "center"
  	},
  	statusBar: {
    		height: 44,
    		paddingHorizontal: 24,
    		paddingVertical: 0,
    		flexDirection: "row",
    		justifyContent: "space-between"
  	},
  	text: {
    		fontSize: 14,
    		fontWeight: "600",
    		fontFamily: "Inter-SemiBold",
    		textAlign: "left",
    		color: "#fff"
  	},
  	frame: {
    		gap: 6,
    		flexDirection: "row",
    		alignItems: "center"
  	},
  	iosSignalIcon: {
    		height: 20
  	},
  	iosBatteryFullIcon: {
    		width: 28,
    		height: 20
  	},
  	brandingArea: {
    		gap: 24,
    		alignSelf: "stretch",
    		justifyContent: "center"
  	},
  	ludoLogoIcon: {
    		width: 240,
    		height: 240,
    		boxShadow: "0px 0px 28px rgba(255, 214, 0, 0.18)",
    		borderRadius: 120
  	},
  	taglineContainer: {
    		borderRadius: 12,
    		backgroundColor: "rgba(255, 255, 255, 0.05)",
    		borderColor: "rgba(255, 255, 255, 0.1)",
    		borderWidth: 1,
    		alignItems: "flex-start",
    		paddingHorizontal: 19,
    		paddingVertical: 7,
    		alignSelf: "center"
  	},
  	tagline: {
    		fontSize: 18,
    		letterSpacing: 0.3,
    		fontWeight: "700"
  	},
  	roll: {
    		color: "#fff"
  	},
  	move: {
    		color: "#ff2d55"
  	},
  	conquer: {
    		color: "#ffcc00"
  	},
  	ctaSection: {
    		paddingHorizontal: 32,
    		paddingBottom: 64
  	},
  	playButton: {
    		height: 64,
    		boxShadow: "0px 6px 18px rgba(255, 153, 0, 0.4)",
    		elevation: 18,
    		borderRadius: 32,
    		borderColor: "rgba(255, 255, 255, 0.4)",
    		borderWidth: 3,
    		gap: 10,
    		justifyContent: "center",
    		alignItems: "center",
    		alignSelf: "stretch",
    		backgroundColor: "transparent"
  	},
  	ctaText: {
    		fontSize: 20,
    		letterSpacing: 0.5,
    		color: "#000"
  	},
  	tapToPlayHint: {
    		fontSize: 12,
    		letterSpacing: 1,
    		textTransform: "uppercase",
    		fontWeight: "500",
    		fontFamily: "Geist",
    		color: "#8e9aa8",
    		alignSelf: "center",
    		textAlign: "left"
  	},
  	homeIndicator: {
    		width: 390,
    		height: 34,
    		left: 0,
    		bottom: 0,
    		position: "absolute"
  	},
  	indicatorBar: {
    		width: 134,
    		height: 5,
    		borderRadius: 3,
    		backgroundColor: "#fff",
    		opacity: 0
  	}
});

export default SplashScreen;
