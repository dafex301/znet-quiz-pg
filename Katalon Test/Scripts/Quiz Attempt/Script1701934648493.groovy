import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import static com.kms.katalon.core.testobject.ObjectRepository.findWindowsObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testng.keyword.TestNGBuiltinKeywords as TestNGKW
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.windows.keyword.WindowsBuiltinKeywords as Windows
import internal.GlobalVariable as GlobalVariable
import org.openqa.selenium.Keys as Keys

WebUI.openBrowser('')

WebUI.navigateToUrl('https://znet-quiz-pg-gamma.vercel.app/')

WebUI.setText(findTestObject('Object Repository/Page_Create Next App/input_Username_identifier'), 'maida')

WebUI.click(findTestObject('Object Repository/Page_Create Next App/button_Continue'))

WebUI.delay(5)

WebUI.setEncryptedText(findTestObject('Page_Create Next App/input_Forgot password_password'), '1I93ogZntnRvlLD+FehUrw==')

WebUI.delay(3)

WebUI.click(findTestObject('Object Repository/Page_Create Next App/button_Continue'))

WebUI.click(findTestObject('Object Repository/Page_Create Next App/a_Go to Practice'))

WebUI.click(findTestObject('Object Repository/Page_Create Next App/button_Start New Practice'))

WebUI.click(findTestObject('Object Repository/Page_Create Next App/button_Selesai'))

Random rand = new Random()

for (int questionNumber = 1; questionNumber <= 5; questionNumber++) {
    int randNumber = rand.nextInt(4) + 1

    WebUI.comment('Random number generated: ' + randNumber)

    switch (randNumber) {
        case 1:
            WebUI.click(findTestObject('Object Repository/Page_Create Next App/Option_A'))

            WebUI.delay(5)

            checkVisible(findTestObject('Object Repository/Page_Create Next App/button_Next'))

            break
        case 2:
            WebUI.click(findTestObject('Object Repository/Page_Create Next App/Option_B'))

            WebUI.delay(5)

            checkVisible(findTestObject('Object Repository/Page_Create Next App/button_Next'))

            break
        case 3:
            WebUI.click(findTestObject('Object Repository/Page_Create Next App/Option_C'))

            WebUI.delay(5)

            checkVisible(findTestObject('Object Repository/Page_Create Next App/button_Next'))

            break
        case 4:
            WebUI.click(findTestObject('Object Repository/Page_Create Next App/Option_D'))

            WebUI.delay(5)

            checkVisible(findTestObject('Object Repository/Page_Create Next App/button_Next'))

            break
        default:
            WebUI.comment('Invalid random number generated.')} // cek is visible dlu yg button next
}

def checkVisible(TestObject buttonNext) {
    if (WebUI.verifyElementVisible(buttonNext, FailureHandling.OPTIONAL)) {
        WebUI.click(findTestObject('Object Repository/Page_Create Next App/button_Next'))
    } else {
        WebUI.click(findTestObject('Object Repository/Page_Create Next App/button_Selesai'))
		WebUI.verifyElementVisibleInViewport(findTestObject('Page_Create Next App/p_Your Score Result'), 0)
    }
}


