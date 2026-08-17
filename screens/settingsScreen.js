import * as React from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SettingsScreen = ({ username, session, onBack, onLogin, onLogout }) => {
  	
  	return (
    		<View style={[styles.settingsScreen, styles.deletionRowFlexBox]}>
      			<Image style={[styles.glowRedTlIcon, styles.glowIconPosition1]} resizeMode="cover" />
      			<Image style={[styles.glowBlueTrIcon, styles.glowIconPosition1]} resizeMode="cover" />
      			<Image style={[styles.glowGreenBlIcon, styles.glowIconPosition]} resizeMode="cover" />
      			<Image style={[styles.glowYellowBrIcon, styles.glowIconPosition]} resizeMode="cover" />
      			<View style={styles.topContentGroup}>
        				<View style={styles.topContentPosition}>
          					<View style={[styles.statusBar, styles.headerFlexBox]}>
            						<Text style={[styles.text, styles.textFlexBox]}>9:41</Text>
            						<View style={[styles.statusIcons, styles.leftFlexBox]}>
              							<Image style={styles.iosSignalIcon} resizeMode="cover" />
              							<Image style={styles.iosWifiSignalIcon} resizeMode="cover" />
              							<Image style={styles.iosBatteryFullIcon} resizeMode="cover" />
            						</View>
          					</View>
          					<View style={[styles.header, styles.headerFlexBox]}>
            						<TouchableOpacity activeOpacity={0.8} onPress={onBack} style={[styles.backBtnWrapper, styles.btnFlexBox]}>
              							<Image style={styles.arrowLeftIcon} resizeMode="cover" />
            						</TouchableOpacity>
            						<View style={[styles.titleContainer, styles.leftFlexBox]}>
              							<Image style={styles.starIcon} resizeMode="cover" />
              							<Text style={[styles.settings, styles.textFlexBox]}>Settings</Text>
            						</View>
            						<View style={[styles.backBtnWrapper, styles.btnFlexBox]}>
              							<Image style={styles.starIcon} resizeMode="cover" />
            						</View>
          					</View>
          					<View style={styles.scrollableContent}>
            						{!session ? (
                          <TouchableOpacity activeOpacity={0.8} onPress={onLogin} style={[styles.googleLoginBtn, styles.btnFlexBox]}>
                							<View style={styles.gLogoContainer}>
                  								<Image style={styles.circleXIcon} resizeMode="cover" />
                							</View>
                							<Text style={[styles.loginWithGoogle, styles.text2Typo]}>Login with Google</Text>
              						</TouchableOpacity>
                        ) : (
                          <TouchableOpacity activeOpacity={0.8} onPress={onLogout} style={[styles.googleLoginBtn, styles.btnFlexBox, { backgroundColor: '#FF3B30' }]}>
                							<Text style={[styles.loginWithGoogle, styles.text2Typo, { color: '#FFF' }]}>Logout</Text>
              						</TouchableOpacity>
                        )}
            						<View style={styles.panelBorder}>
              							<View style={styles.headerFlexBox}>
                								<View style={styles.setNameLeft}>
                  									<Text style={[styles.displayName, styles.kingRoll99FlexBox]}>Display Name</Text>
                  									<Text style={[styles.kingRoll99, styles.kingRoll99FlexBox]}>{username || 'Guest'}</Text>
                								</View>
                								<View style={[styles.editBtn, styles.btnClr]}>
                  									<Image style={styles.starIcon} resizeMode="cover" />
                								</View>
              							</View>
            						</View>
            						<View style={[styles.soundMusicPanel, styles.lineBorder1]}>
              							<View style={styles.sliderSoundEffects}>
                								<View style={styles.headerFlexBox}>
                  									<Text style={[styles.soundEffects, styles.text2Typo]}>Sound Effects</Text>
                  									<Text style={[styles.text2, styles.text2Typo]}>80%</Text>
                								</View>
                								<View style={styles.sliderTrackArea}>
                  									<View style={styles.trackFrame}>
                    										<View style={styles.trackBg} />
                    										<LinearGradient style={[styles.trackActive, styles.trackPosition]} locations={[0,1]} colors={['#ffe259','#ffa751']} useAngle={true} angle={45} />
                    										<Image style={[styles.sliderThumbIcon, styles.sliderIconPosition]} resizeMode="cover" />
                  									</View>
                								</View>
              							</View>
              							<View style={[styles.line, styles.lineBorder]} />
              							<View style={styles.sliderSoundEffects}>
                								<View style={styles.headerFlexBox}>
                  									<Text style={[styles.soundEffects, styles.text2Typo]}>Music volume</Text>
                  									<Text style={[styles.text2, styles.text2Typo]}>60%</Text>
                								</View>
                								<View style={styles.sliderTrackArea}>
                  									<View style={styles.trackFrame}>
                    										<View style={styles.trackBg} />
                    										<LinearGradient style={[styles.trackActive2, styles.trackPosition]} locations={[0,1]} colors={['#ffe259','#ffa751']} useAngle={true} angle={45} />
                    										<Image style={[styles.sliderThumbIcon2, styles.sliderIconPosition]} resizeMode="cover" />
                  									</View>
                								</View>
              							</View>
            						</View>
            						<View style={[styles.legalPanel, styles.panelBorder]}>
              							<View style={styles.headerFlexBox}>
                								<View style={[styles.privacyLeft, styles.leftFlexBox]}>
                  									<View style={[styles.rowIconShield, styles.rowIconLayout]}>
                    										<Image style={styles.arrowLeftIcon} resizeMode="cover" />
                  									</View>
                  									<Text style={[styles.text, styles.textFlexBox]}>Privacy Policy</Text>
                								</View>
                								<View style={[styles.viewBtn, styles.btnBorder]}>
                  									<Text style={[styles.view, styles.viewTypo]}>View</Text>
                								</View>
              							</View>
              							<View style={[styles.line, styles.lineBorder]} />
              							<View style={[styles.deletionRow, styles.leftFlexBox]}>
                								<View style={[styles.deletionLeft, styles.leftFlexBox]}>
                  									<View style={[styles.rowIconTrash, styles.rowIconLayout]}>
                    										<Image style={styles.arrowLeftIcon} resizeMode="cover" />
                  									</View>
                  									<View style={styles.deletionTextStack}>
                    										<Text style={[styles.accountDeletion, styles.textFlexBox]}>Account Deletion</Text>
                  									</View>
                								</View>
                								<View style={[styles.deleteBtn, styles.btnBorder]}>
                  									<Text style={[styles.delete, styles.viewTypo]}>Delete</Text>
                								</View>
              							</View>
            						</View>
          					</View>
        				</View>
      			</View>
      			<View style={styles.bottomNavigationGroup}>
        				<View style={[styles.bottomNavigationBar, styles.lineBorder]}>
          					<View style={[styles.btnStore, styles.btnFlexBox]}>
            						<View style={[styles.iconWrapper, styles.iconWrapperLayout]}>
              							<Image style={styles.circleXIcon} resizeMode="cover" />
            						</View>
            						<Text style={[styles.store, styles.storeTypo]}>Store</Text>
          					</View>
          					<View style={[styles.btnStore, styles.btnFlexBox]}>
            						<View style={[styles.iconWrapper, styles.iconWrapperLayout]}>
              							<Image style={styles.circleXIcon} resizeMode="cover" />
            						</View>
            						<Text style={[styles.store, styles.storeTypo]}>Powerups</Text>
          					</View>
          					<View style={[styles.btnStore, styles.btnFlexBox]}>
            						<View style={[styles.iconWrapper, styles.iconWrapperLayout]}>
              							<Image style={styles.circleXIcon} resizeMode="cover" />
            						</View>
            						<Text style={[styles.store, styles.storeTypo]}>Skins</Text>
          					</View>
          					<View style={[styles.btnStore, styles.btnFlexBox]}>
            						<View style={[styles.iconWrapper4, styles.iconWrapperLayout]}>
              							<Image style={styles.circleXIcon} resizeMode="cover" />
            						</View>
            						<Text style={[styles.settings2, styles.storeTypo]}>Settings</Text>
          					</View>
        				</View>
      			</View>
    		</View>);
};

const styles = StyleSheet.create({
  	deletionRowFlexBox: {
    		gap: 0,
    		justifyContent: "space-between"
  	},
  	glowIconPosition1: {
    		opacity: 0,
    		filter: "blur(100px)",
    		top: -80,
    		position: "absolute",
    		height: 240,
    		width: 240
  	},
  	glowIconPosition: {
    		top: 680,
    		opacity: 0,
    		filter: "blur(100px)",
    		position: "absolute",
    		height: 240,
    		width: 240
  	},
  	headerFlexBox: {
    		gap: 20,
    		alignItems: "center",
    		flexDirection: "row",
    		alignSelf: "stretch",
    		justifyContent: "space-between"
  	},
  	textFlexBox: {
    		textAlign: "left",
    		color: "#fff"
  	},
  	leftFlexBox: {
    		alignItems: "center",
    		flexDirection: "row"
  	},
  	btnFlexBox: {
    		justifyContent: "center",
    		alignItems: "center"
  	},
  	text2Typo: {
    		fontWeight: "700",
    		textAlign: "left"
  	},
  	kingRoll99FlexBox: {
    		alignSelf: "flex-start",
    		fontWeight: "700",
    		textAlign: "left"
  	},
  	btnClr: {
    		borderColor: "#44445f",
    		backgroundColor: "#303045"
  	},
  	lineBorder1: {
    		borderColor: "rgba(48, 48, 63, 0.5)",
    		alignSelf: "stretch"
  	},
  	trackPosition: {
    		backgroundColor: "transparent",
    		borderRadius: 5,
    		height: 10,
    		left: 0,
    		top: 0,
    		position: "absolute"
  	},
  	sliderIconPosition: {
    		boxShadow: "0px 0px 8px rgba(255, 167, 81, 0.5)",
    		top: -7,
    		width: 24,
    		height: 24,
    		position: "absolute"
  	},
  	lineBorder: {
    		borderTopWidth: 1,
    		borderStyle: "solid"
  	},
  	panelBorder: {
    		paddingVertical: 19,
    		borderColor: "rgba(48, 48, 63, 0.5)",
    		backgroundColor: "rgba(23, 23, 33, 0.5)",
    		paddingHorizontal: 20,
    		borderWidth: 1,
    		borderStyle: "solid",
    		borderRadius: 20,
    		alignSelf: "stretch",
    		alignItems: "flex-start"
  	},
  	rowIconLayout: {
    		borderRadius: 8,
    		width: 32,
    		height: 32,
    		justifyContent: "center",
    		alignItems: "center"
  	},
  	btnBorder: {
    		paddingVertical: 7,
    		paddingHorizontal: 15,
    		borderRadius: 12,
    		borderWidth: 1,
    		borderStyle: "solid",
    		flexDirection: "row",
    		alignItems: "flex-start"
  	},
  	viewTypo: {
    		fontSize: 13,
    		fontFamily: "Outfit-Bold",
    		fontWeight: "700",
    		textTransform: "uppercase",
    		textAlign: "left"
  	},
  	iconWrapperLayout: {
    		height: 36,
    		width: 36,
    		borderRadius: 12,
    		justifyContent: "center",
    		alignItems: "center"
  	},
  	storeTypo: {
    		fontSize: 11,
    		alignSelf: "center",
    		textTransform: "uppercase",
    		textAlign: "left"
  	},
  	settingsScreen: {
    		height: 874,
    		backgroundColor: "#0b0b0f",
    		width: "100%",
    		overflow: "hidden",
    		minHeight: 874,
    		alignItems: "flex-start"
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
  	topContentGroup: {
    		height: 716,
    		zIndex: 4,
    		alignSelf: "stretch"
  	},
  	topContentPosition: {
    		width: 402,
    		left: 0,
    		top: 0,
    		position: "absolute",
    		alignItems: "flex-start"
  	},
  	statusBar: {
    		height: 54,
    		paddingVertical: 0,
    		paddingHorizontal: 24
  	},
  	text: {
    		fontFamily: "Geist",
    		fontWeight: "600",
    		textAlign: "left",
    		fontSize: 15
  	},
  	statusIcons: {
    		gap: 6
  	},
  	iosSignalIcon: {
    		height: 11,
    		width: 17
  	},
  	iosWifiSignalIcon: {
    		width: 16,
    		height: 12
  	},
  	iosBatteryFullIcon: {
    		width: 25,
    		height: 12
  	},
  	header: {
    		height: 64,
    		paddingVertical: 0,
    		paddingHorizontal: 24
  	},
  	backBtnWrapper: {
    		backgroundColor: "#1b1b26",
    		borderColor: "#313145",
    		borderWidth: 1,
    		borderStyle: "solid",
    		borderRadius: 20,
    		width: 40,
    		height: 40,
    		justifyContent: "center",
    		flexDirection: "row"
  	},
  	arrowLeftIcon: {
    		height: 16,
    		width: 16
  	},
  	titleContainer: {
    		gap: 8
  	},
  	starIcon: {
    		height: 18,
    		width: 18
  	},
  	settings: {
    		fontSize: 20,
    		fontWeight: "900",
    		fontFamily: "Outfit-Black",
    		textTransform: "uppercase"
  	},
  	scrollableContent: {
    		paddingTop: 12,
    		paddingBottom: 24,
    		gap: 28,
    		paddingHorizontal: 20,
    		alignSelf: "stretch",
    		alignItems: "flex-start"
  	},
  	googleLoginBtn: {
    		height: 56,
    		boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
    		elevation: 12,
    		borderRadius: 16,
    		backgroundColor: "#f5f5fa",
    		gap: 16,
    		paddingVertical: 0,
    		paddingHorizontal: 24,
    		flexDirection: "row",
    		alignSelf: "stretch"
  	},
  	gLogoContainer: {
    		width: 24,
    		height: 24,
    		justifyContent: "center",
    		alignItems: "center"
  	},
  	circleXIcon: {
    		width: 20,
    		height: 20
  	},
  	loginWithGoogle: {
    		fontSize: 16,
    		color: "#111115",
    		fontFamily: "Outfit-Bold"
  	},
  	setNameLeft: {
    		gap: 6,
    		alignItems: "flex-start"
  	},
  	displayName: {
    		fontSize: 12,
    		color: "#ffc72c",
    		fontFamily: "Outfit-Bold",
    		textTransform: "uppercase"
  	},
  	kingRoll99: {
    		fontSize: 18,
    		display: "none",
    		color: "#fff",
    		fontFamily: "Geist"
  	},
  	editBtn: {
    		borderRadius: 12,
    		borderColor: "#44445f",
    		backgroundColor: "#303045",
    		justifyContent: "center",
    		borderWidth: 1,
    		borderStyle: "solid",
    		width: 40,
    		height: 40,
    		alignItems: "center"
  	},
  	soundMusicPanel: {
    		paddingVertical: 23,
    		gap: 24,
    		backgroundColor: "rgba(23, 23, 33, 0.5)",
    		borderColor: "rgba(48, 48, 63, 0.5)",
    		borderWidth: 1,
    		borderStyle: "solid",
    		borderRadius: 20,
    		paddingHorizontal: 24,
    		alignItems: "flex-start"
  	},
  	sliderSoundEffects: {
    		gap: 12,
    		alignSelf: "stretch",
    		alignItems: "flex-start"
  	},
  	soundEffects: {
    		fontFamily: "Outfit-Bold",
    		textTransform: "uppercase",
    		color: "#fff",
    		fontSize: 15,
    		fontWeight: "700"
  	},
  	text2: {
    		fontSize: 14,
    		color: "#ffc72c",
    		fontFamily: "Geist"
  	},
  	sliderTrackArea: {
    		height: 24,
    		alignItems: "center",
    		flexDirection: "row",
    		alignSelf: "stretch"
  	},
  	trackFrame: {
    		flex: 1,
    		height: 10
  	},
  	trackBg: {
    		right: 0,
    		backgroundColor: "#181824",
    		borderColor: "#252538",
    		borderRadius: 5,
    		height: 10,
    		borderWidth: 1,
    		borderStyle: "solid",
    		left: 0,
    		top: 0,
    		position: "absolute"
  	},
  	trackActive: {
    		width: 251
  	},
  	sliderThumbIcon: {
    		left: 239
  	},
  	line: {
    		height: 0,
    		borderColor: "rgba(48, 48, 63, 0.5)",
    		alignSelf: "stretch"
  	},
  	trackActive2: {
    		width: 188
  	},
  	sliderThumbIcon2: {
    		left: 176
  	},
  	legalPanel: {
    		gap: 16
  	},
  	privacyLeft: {
    		gap: 12
  	},
  	rowIconShield: {
    		backgroundColor: "#242433"
  	},
  	viewBtn: {
    		borderColor: "#44445f",
    		backgroundColor: "#303045"
  	},
  	view: {
    		color: "#fff"
  	},
  	deletionRow: {
    		alignSelf: "stretch",
    		gap: 0,
    		justifyContent: "space-between"
  	},
  	deletionLeft: {
    		flex: 1,
    		gap: 12
  	},
  	rowIconTrash: {
    		backgroundColor: "#3d1c1c"
  	},
  	deletionTextStack: {
    		flex: 1,
    		alignItems: "flex-start"
  	},
  	accountDeletion: {
    		fontFamily: "Geist",
    		fontWeight: "600",
    		textAlign: "left",
    		fontSize: 15,
    		alignSelf: "stretch"
  	},
  	deleteBtn: {
    		backgroundColor: "rgba(255, 59, 48, 0.13)",
    		borderColor: "#ff3b30"
  	},
  	delete: {
    		color: "#ff3b30"
  	},
  	bottomNavigationGroup: {
    		zIndex: 5,
    		height: 84,
    		alignSelf: "stretch"
  	},
  	bottomNavigationBar: {
    		backgroundColor: "#0f0f16",
    		borderColor: "#1f1f2e",
    		paddingHorizontal: 12,
    		paddingTop: 7,
    		paddingBottom: 20,
    		height: 84,
    		flexDirection: "row",
    		width: 402,
    		left: 0,
    		top: 0,
    		position: "absolute",
    		alignItems: "flex-start"
  	},
  	btnStore: {
    		paddingHorizontal: 0,
    		paddingVertical: 10,
    		flex: 1,
    		gap: 6
  	},
  	iconWrapper: {
    		backgroundColor: "rgba(0, 0, 0, 0)"
  	},
  	store: {
    		fontWeight: "500",
    		fontFamily: "Outfit-Medium",
    		color: "#8e8e9f"
  	},
  	iconWrapper4: {
    		backgroundColor: "rgba(255, 167, 81, 0.1)"
  	},
  	settings2: {
    		fontWeight: "800",
    		fontFamily: "Outfit-ExtraBold",
    		color: "#ffc72c"
  	}
});

export default SettingsScreen;
