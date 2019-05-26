import random

from viewpoint.tests.base_test import BaseTestCase


class TestWorkflow03(BaseTestCase):
    def test_input_function(self, util):
        """
        :type util: viewpoint.lib.viewpoint_browser_util.ViewPointTestUtil
        """
        num = random.randint(10, 20)
        rand = random.randint(1000, 9999)
        caption = 'STR' + str(rand)

        # util.openPage()
        util.navigateByButton('Button3')

        util.setElementProperty('NumericInput1', 'Caption', num, isDigit=True)
        assert util.waitDisplayUpdate('NumericDisplay1', 'DisplayText', str(num)),\
            "Numeric input 's value should be " + str(num)

        util.setElementProperty('StringInput1', 'Caption', caption)
        assert util.waitDisplayUpdate('StringDisplay1', 'DisplayText', caption),\
            "String input 's value should be " + caption
