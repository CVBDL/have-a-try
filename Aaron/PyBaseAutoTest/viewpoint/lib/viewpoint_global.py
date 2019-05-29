def singleton(cls):
    instances = {}

    def getinstance():
        if cls not in instances:
            instances[cls] = cls()
        return instances[cls]

    return getinstance


@singleton
class Global:

    def __init__(self):
        self.caseName = "MerlinTest"
        self.initDisplay = ""

    # def get_info_from_csv(self, case_name):
