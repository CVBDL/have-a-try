# coding:utf-8


class BaseTestCase(object):
    """
    :test
    """

    def setUp(self):
        """
        :test
        """
        print("setup funciton in BaseTestCase")
        super(BaseTestCase, self).setUp()

    def tearDown(self):
        """
        :test
        """
        print("tearDown funciton in BaseTestCase")
        pass
