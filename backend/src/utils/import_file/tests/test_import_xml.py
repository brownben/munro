import unittest

from ..import_file import ImportException
from ..import_xml import process_xml_file

# Sample XML files taken from the IOF XML repository
# (https://github.com/international-orienteering-federation/datastandard-v3)
iof_example_xml_file = """
    <?xml version="1.0" encoding="UTF-8"?>
    <!--
        Result list for an individual event where one of the classes use multiple courses (butterfly-loop style).
    -->
    <ResultList xmlns="http://www.orienteering.org/datastandard/3.0"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                iofVersion="3.0"
                createTime="2011-07-31T22:46:33+01:00"
                creator="Example Software"
                status="Complete">
        <Event>
        <Name>Example event</Name>
        <StartTime>
            <Date>2011-07-30</Date>
            <Time>10:00:00+01:00</Time>
        </StartTime>
        <EndTime>
            <Date>2011-07-30</Date>
            <Time>14:00:00+01:00</Time>
        </EndTime>
        </Event>
        <ClassResult>
        <Class>
            <Id>1</Id>
            <Name>Men Elite</Name>
        </Class>
        <!-- if there are multiple courses per class, a Course element without any id may be included to express the properties of an average pseudo course -->
        <Course>
            <!-- course length is expressed in meters -->
            <Length>4650</Length>
            <!-- course climb is expressed in meters; omit the Climb element if the course climb is not known -->
            <Climb>160</Climb>
        </Course>
        <PersonResult>
            <Person>
            <Id>1</Id>
            <Name>
                <Family>Wood</Family>
                <Given>George</Given>
            </Name>
            </Person>
            <!-- the Organisation element is to be omitted if the competitor does not represent a club -->
            <Organisation>
            <Id>5</Id>
            <Name>OC Back and Forth</Name>
            <Country code="GBR">Great Britain</Country>
            </Organisation>
            <Result>
            <BibNumber>101</BibNumber>
            <!-- start and finish times are expressed in ISO 8601 format, optionally including time zone information: YYYY-MM-DDThh:mm:ss[.s[s[s]]][((+|-)hh:mm)|Z] -->
            <!-- for a detailed specification, see http://www.w3.org/TR/xmlschema-2/#dateTime -->
            <StartTime>2011-07-30T10:00:00+01:00</StartTime>
            <FinishTime>2011-07-30T10:33:21+01:00</FinishTime>
            <!-- times are expressed in seconds, use period as decimal separator for fractions of seconds -->
            <Time>2001</Time>
            <!-- time behind the winner -->
            <TimeBehind>0</TimeBehind>
            <!-- the position in the result list -->
            <Position>1</Position>
            <!-- the result status, see the xml schema file for all status codes -->
            <Status>OK</Status>
            <!-- the Course element may be used on person result level when not all competitors in the class have been assigned the same course, e.g. when butterfly loops are used -->
            <Course>
                <Id>1</Id>
                <Name>Men Elite-1</Name>
                <Length>4650</Length>
                <Climb>160</Climb>
            </Course>
            <!-- split times may be omitted, but if they are present all controls of the course that is assigned to the competitor must be included in the correct order, even if they have not been visited -->
            <!-- start and finish punches must not be included; use StartTime and FinishTime of the Result element instead -->
            <SplitTime>
                <ControlCode>31</ControlCode>
                <!-- if the control has been visited but the time is not known (e.g. due to a failing punching unit), omit the Time element -->
                <Time>501</Time>
            </SplitTime>
            <SplitTime>
                <ControlCode>32</ControlCode>
                <Time>720</Time>
            </SplitTime>
            <SplitTime>
                <ControlCode>31</ControlCode>
                <Time>818</Time>
            </SplitTime>
            <SplitTime>
                <ControlCode>33</ControlCode>
                <Time>1136</Time>
            </SplitTime>
            <SplitTime>
                <ControlCode>31</ControlCode>
                <Time>1593</Time>
            </SplitTime>
            <!--
                route with two waypoints as base64-encoded binary data, see the schema file for the format specification
                the base64-encoded string 'BAMzzEOigAOP4ikBDddJAAJELAXWUOxUKQQAiQBJDw==' below translates to the following binary data (shown in hexadecimal):
                04 03 33 CC 43 A2 80 03 8F E2 29 01 0D D7 49 00 02 44 2C 05 D6 50 EC 54 29 04 00 89 00 49 0F

                broken down inte waypoints according to the specification, we get

                waypoint 1:
                04                  waypoint header byte      normal waypoint; time and position in full storage mode; altitude present
                03 33 CC 43 A2 80   time byte sequence        2011-07-30 09:00:00 UTC
                03 8F E2 29         latitude byte sequence    N 59.761193° (N 59°45'40.2948")
                01 0D D7 49         longitude byte sequence   E 17.684297° (E 17°41'03.4692")
                00 02 44            altitude byte sequence    58.0 meters above sea level

                waypoint 2:
                2C                  waypoint header byte      normal waypoint; time, latitude and longitude in delta storage mode; altitude present; altitude in delta storage mode
                05                  time byte sequence        delta value 5 seconds, time is 2011-07-30 09:00:05 UTC
                D6                  latitude byte sequence    delta value -0.000042°, latitude is N 59.761151° (N 59°45'40.1436")
                50                  longitude byte sequence   delta value +0.000080°, langitude is E 17.684377° (E 17°41'03.7572")
                EC                  altitude byte sequence    delta value -2.0 meters, altitude is 56.0 meters above sea level
                waypoint 3:
                54                  waypoint header byte      normal waypoint; time, latitude and longitude in delta storage mode; altitude present; altitude in delta storage mode
                29 04               time byte sequence        delta value 15500 milliseconds, time is 2011-07-30 09:00:15.5 UTC
                00 89               latitude byte sequence    delta value +0.000137°, latitude is N 59.761288° (N 59°45'40.6368")
                00 49               longitude byte sequence   delta value +0.000073°, langitude is E 17.684450° (E 17°41'04.0200")
                0F                  altitude byte sequence    delta value +1.5 meters, altitude is 57.5 meters above sea level
            -->
            <Route>BAMzzEOigAOP4ikBDddJAAJELAXWUOxUKQQAiQBJDw==</Route>
            <ControlCard>794021</ControlCard>
            <!-- competitor fees defined on general level; for example entry fees -->
            <!-- this competitor has been assigned one fee -->
            <AssignedFee>
                <Fee>
                <Id>1</Id>
                <Name>Adult entry fee</Name>
                <Amount currency="EUR">10</Amount>
                <TaxableAmount currency="EUR">8</TaxableAmount>
                </Fee>
            </AssignedFee>
            <!-- ordered services and fees related to these; for example rental card fee -->
            <!-- this competitor has requested a rental card -->
            <ServiceRequest>
                <Service>
                <Id>1</Id>
                <Name>Rental card</Name>
                </Service>
                <RequestedQuantity>1</RequestedQuantity>
                <AssignedFee>
                <Fee>
                    <Id>4</Id>
                    <Name>Rental card fee</Name>
                    <Amount currency="EUR">2</Amount>
                </Fee>
                </AssignedFee>
            </ServiceRequest>
            </Result>
        </PersonResult>
        <!-- example of a competitor that has mispunched, in this case running butterfly loops in the wrong order (the course's control code sequence is S-31-33-31-32-31-F, but the competitor punched S-31-32-31-33-31-F) -->
        <PersonResult>
            <Person>
            <Id>2</Id>
            <Name>
                <Family>Martin</Family>
                <Given>Edgar</Given>
            </Name>
            </Person>
            <Organisation>
            <Id>2</Id>
            <Name>Bushmen OC</Name>
            <Country code="GBR">Great Britain</Country>
            </Organisation>
            <Result>
            <BibNumber>102</BibNumber>
            <StartTime>2011-07-30T10:03:00+01:00</StartTime>
            <!-- the finish time is included even if the competitor has not completed his course -->
            <FinishTime>2011-07-30T10:39:42+01:00</FinishTime>
            <!-- the time is included even if the competitor has not completed his course -->
            <Time>2202</Time>
            <Status>MissingPunch</Status>
            <Course>
                <Id>2</Id>
                <Name>Men Elite-2</Name>
                <Length>4650</Length>
                <Climb>160</Climb>
            </Course>
            <SplitTime>
                <ControlCode>31</ControlCode>
                <Time>693</Time>
            </SplitTime>
            <SplitTime>
                <ControlCode>33</ControlCode>
                <Time>1581</Time>
            </SplitTime>
            <SplitTime>
                <ControlCode>31</ControlCode>
                <Time>1920</Time>
            </SplitTime>
            <!-- controls that have not been visited (or - as in this case - punched but not in the correct order) must still be included, but with the status attribute set to Missing -->
            <SplitTime status="Missing">
                <ControlCode>32</ControlCode>
            </SplitTime>
            <SplitTime status="Missing">
                <ControlCode>31</ControlCode>
            </SplitTime>
            <!-- additional punches that do not belong to the course or are not in the correct order may be expressed using the Additional status -->
            <SplitTime status="Additional">
                <ControlCode>32</ControlCode>
                <Time>966</Time>
            </SplitTime>
            <SplitTime status="Additional">
                <ControlCode>31</ControlCode>
                <Time>1379</Time>
            </SplitTime>
            <ControlCard>299482</ControlCard>
            <AssignedFee>
                <Fee>
                <Id>2</Id>
                <Name>Youth entry fee</Name>
                <Amount currency="EUR">5</Amount>
                <TaxableAmount currency="EUR">4</TaxableAmount>
                </Fee>
            </AssignedFee>
            </Result>
        </PersonResult>
        </ClassResult>
        <ClassResult>
        <Class>
            <Id>2</Id>
            <Name>Open</Name>
        </Class>
        <Course>
            <Id>3</Id>
            <Name>Open</Name>
            <Length>2990</Length>
            <Climb>120</Climb>
        </Course>
        <PersonResult>
            <Person>
            <Id>3</Id>
            <Name>
                <Family>Lawson</Family>
                <Given>Toni</Given>
            </Name>
            </Person>
            <Organisation>
            <Id>6</Id>
            <Name>Doubtful Direction</Name>
            <Country code="GBR">Great Britain</Country>
            </Organisation>
            <Result>
            <StartTime>2011-07-30T10:15:00+01:00</StartTime>
            <Status>DidNotStart</Status>
            <ControlCard>973078</ControlCard>
            <!-- this competitor has been assigned two fees - adult entry fee and late entry fee - and both of them have been paid -->
            <AssignedFee>
                <Fee>
                <Id>1</Id>
                <Name>Adult entry fee</Name>
                <Amount currency="EUR">10</Amount>
                <TaxableAmount currency="EUR">8</TaxableAmount>
                </Fee>
                <PaidAmount currency="EUR">10</PaidAmount>
            </AssignedFee>
            <AssignedFee>
                <Fee>
                <Id>3</Id>
                <Name>Late entry fee</Name>
                <Amount currency="EUR">4</Amount>
                </Fee>
                <PaidAmount currency="EUR">4</PaidAmount>
            </AssignedFee>
            </Result>
        </PersonResult>
        </ClassResult>
    </ResultList>
"""
iof_extra_tags_example = """
    <?xml version="1.0" encoding="UTF-8"?>
    <!--
    Result list for an individual event where some extended information, not included in the IOF Interface Standard specification, has been added.
    The prefix 'x' is used for the custom namespace http://www.example.org/my/custom/namespace, which is declared in the root element.
    -->
    <ResultList xmlns="http://www.orienteering.org/datastandard/3.0"
                xmlns:x="http://www.example.org/my/custom/namespace"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                iofVersion="3.0"
                createTime="2011-07-31T22:46:33+01:00"
                creator="Example Software"
                status="Complete">
    <Event>
        <Name>Example event</Name>
        <StartTime>
        <Date>2011-07-30</Date>
        <Time>10:00:00+01:00</Time>
        </StartTime>
        <EndTime>
        <Date>2011-07-30</Date>
        <Time>14:00:00+01:00</Time>
        </EndTime>
    </Event>
    <ClassResult>
        <Class>
        <Id>1</Id>
        <Name>Men Elite</Name>
        </Class>
        <Course>
        <Length>4650</Length>
        <Climb>160</Climb>
        </Course>
        <PersonResult>
        <Person>
            <Id>1</Id>
            <Name>
            <Family>Wood</Family>
            <Given>George</Given>
            </Name>
            <Extensions>
            <!-- including an element with person information defined in a custom namespace -->
            <x:MyCustomPersonElement attribute1="x" attribute2="y">
                <x:MyCustomPersonSubElement>z</x:MyCustomPersonSubElement>
            </x:MyCustomPersonElement>
            </Extensions>
        </Person>
        <Organisation>
            <Id>5</Id>
            <Name>OC Back and Forth</Name>
            <Country code="GBR">Great Britain</Country>
        </Organisation>
        <Result>
            <BibNumber>101</BibNumber>
            <StartTime>2011-07-30T10:00:00+01:00</StartTime>
            <FinishTime>2011-07-30T10:33:21+01:00</FinishTime>
            <Time>2001</Time>
            <TimeBehind>0</TimeBehind>
            <Position>1</Position>
            <Status>OK</Status>
            <Extensions>
            <!-- including an element with result information defined in a custom namespace -->
            <x:MyCustomResultElement myCustomAttribute="1234">5678</x:MyCustomResultElement>
            </Extensions>
        </Result>
        </PersonResult>
        <PersonResult>
        <Person>
            <Id>2</Id>
            <Name>
            <Family>Martin</Family>
            <Given>Edgar</Given>
            </Name>
            <Extensions>
            <x:MyCustomPersonElement attribute1="a">
                <x:MyCustomPersonSubElement>b</x:MyCustomPersonSubElement>
            </x:MyCustomPersonElement>
            </Extensions>
        </Person>
        <Organisation>
            <Id>2</Id>
            <Name>Bushmen OC</Name>
            <Country code="GBR">Great Britain</Country>
        </Organisation>
        <Result>
            <BibNumber>102</BibNumber>
            <StartTime>2011-07-30T10:03:00+01:00</StartTime>
            <FinishTime>2011-07-30T10:39:42+01:00</FinishTime>
            <Time>2202</Time>
            <Status>MissingPunch</Status>
            <Extensions>
            <x:MyCustomResultElement myCustomAttribute="9012">3456</x:MyCustomResultElement>
            </Extensions>
        </Result>
        </PersonResult>
    </ClassResult>
    </ResultList>
"""
iof_extry_list = """
    <?xml version="1.0" encoding="UTF-8"?>
    <!--
    Entry list for an individual event, containing competitors and the classes entered.
    -->
    <EntryList xmlns="http://www.orienteering.org/datastandard/3.0"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            iofVersion="3.0"
            createTime="2011-07-20T12:16:31+02:00"
            creator="Example Software">
    <Event>
        <Name>Example event</Name>
        <StartTime>
        <Date>2011-07-31</Date>
        <Time>10:00:00+01:00</Time>
        </StartTime>
    </Event>
    <PersonEntry>
        <Person>
        <Id>1</Id>
        <Name>
            <Family>Wood</Family>
            <Given>George</Given>
        </Name>
        </Person>
        <!-- the Organisation element is to be omitted if the competitor does not represent a club -->
        <Organisation>
        <Id>5</Id>
        <Name>OC Back and Forth</Name>
        <Country code="GBR">Great Britain</Country>
        </Organisation>
        <!-- the ControlCard element is to be omitted if the competitor wishes to rent a control card -->
        <ControlCard>794021</ControlCard>
        <Class>
        <Id>1</Id>
        <Name>Men Elite</Name>
        </Class>
        <EntryTime>2011-07-14T18:20:05+01:00</EntryTime>
    </PersonEntry>
    <PersonEntry>
        <Person>
        <Id>2</Id>
        <Name>
            <Family>Martin</Family>
            <Given>Edgar</Given>
        </Name>
        </Person>
        <Organisation>
        <Id>2</Id>
        <Name>Bushmen OC</Name>
        <Country code="GBR">Great Britain</Country>
        </Organisation>
        <!-- this competitor wants to rent a control card, and thus the ControlCard element is omitted -->
        <Class>
        <Id>1</Id>
        <Name>Men Elite</Name>
        </Class>
        <EntryTime>2011-07-10T13:00:04+01:00</EntryTime>
    </PersonEntry>
    <PersonEntry>
        <Person>
        <Id>3</Id>
        <Name>
            <Family>Lawson</Family>
            <Given>Toni</Given>
        </Name>
        </Person>
        <!-- this competitor does not represent a club, and thus the Organisation element is omitted -->
        <ControlCard>973078</ControlCard>
        <Class>
        <Id>2</Id>
        <Name>Open</Name>
        </Class>
        <EntryTime>2011-07-12T05:33:17+01:00</EntryTime>
    </PersonEntry>
    </EntryList>
"""
sitiming_export = """
    <ResultList xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" iofVersion="3.0" createTime="2021-08-13T13:40:16.5923683+01:00" creator="SiTiming v4.212.1942.4062" xmlns="http://www.orienteering.org/datastandard/3.0" xsi:schemaLocation="http://www.orienteering.org/datastandard/3.0 http://www.orienteering.org/datastandard/IOF.xsd">
    <Event>
        <Name>Test Event</Name>
        <StartTime>
        <Date>2021-01-01</Date>
        </StartTime>
    </Event>
    <ClassResult>
        <Class>
        <Name>Long</Name>
        </Class>
        <Course>
        <Name>Long</Name>
        <Length>5000</Length>
        <NumberOfControls>1</NumberOfControls>
        </Course>
        <PersonResult>
        <Person sex="M">
            <Name>
            <Family>Adamson</Family>
            <Given>James</Given>
            </Name>
            <BirthDate>2000-05-02</BirthDate>
        </Person>
        <Organisation>
            <Name>INT</Name>
        </Organisation>
        <Result>
            <StartTime>2021-08-11T19:10:02</StartTime>
            <FinishTime>2021-08-11T19:37:02</FinishTime>
            <Time>1620</Time>
            <TimeBehind>0</TimeBehind>
            <Position>1</Position>
            <Status>OK</Status>
            <SplitTime status="Additional">
            <ControlCode>1</ControlCode>
            <Time>-4</Time>
            </SplitTime>
            <SplitTime>
            <ControlCode>247</ControlCode>
            <Time>3</Time>
            </SplitTime>
            <SplitTime status="Additional">
            <ControlCode>RDO</ControlCode>
            <Time>1620</Time>
            </SplitTime>
        </Result>
        </PersonResult>
        <PersonResult>
        <Person sex="M">
            <Id type="BOF" />
            <Name>
            <Family>Ashbrook</Family>
            <Given>Phil</Given>
            </Name>
            <BirthDate>2000-02-31</BirthDate>
        </Person>
        <Organisation>
            <Name>OD</Name>
        </Organisation>
        <Result>
            <StartTime>2021-08-11T18:14:53</StartTime>
            <FinishTime>2021-08-11T18:42:04</FinishTime>
            <Time>1631</Time>
            <TimeBehind>11</TimeBehind>
            <Position>2</Position>
            <Status>OK</Status>
            <SplitTime status="Additional">
            <ControlCode>1</ControlCode>
            <Time>-5</Time>
            </SplitTime>
            <SplitTime>
            <ControlCode>247</ControlCode>
            <Time>3</Time>
            </SplitTime>
            <SplitTime status="Additional">
            <ControlCode>RDO</ControlCode>
            <Time>1631</Time>
            </SplitTime>
        </Result>
        </PersonResult>
        <PersonResult>
        <Person sex="F">
            <Id type="BOF" />
            <Name>
            <Family>Horse</Family>
            <Given>Josie</Given>
            </Name>
            <BirthDate>1981-12-31</BirthDate>
        </Person>
        <Organisation>
            <Name>ESOC</Name>
        </Organisation>
        <Result>
            <StartTime>2021-08-11T18:22:51</StartTime>
            <FinishTime>2021-08-11T18:53:28</FinishTime>
            <Time>1837</Time>
            <TimeBehind>217</TimeBehind>
            <Position>3</Position>
            <Status>OK</Status>
            <SplitTime status="Additional">
            <ControlCode>1</ControlCode>
            <Time>-7</Time>
            </SplitTime>
            <SplitTime>
            <ControlCode>247</ControlCode>
            <Time>4</Time>
            </SplitTime>
            <SplitTime status="Additional">
            <ControlCode>RDO</ControlCode>
            <Time>1837</Time>
            </SplitTime>
        </Result>
        </PersonResult>
        <PersonResult>
        <Person sex="M">
            <Id type="BOF" />
            <Name>
            <Family>Evans</Family>
            <Given>Simon</Given>
            </Name>
            <BirthDate>1998-12-31</BirthDate>
        </Person>
        <Organisation>
            <Name>ESOC</Name>
        </Organisation>
        <Result>
            <StartTime>2021-08-11T18:15:48</StartTime>
            <FinishTime>2021-08-11T18:47:45</FinishTime>
            <Time>1917</Time>
            <TimeBehind>297</TimeBehind>
            <Position>4</Position>
            <Status>OK</Status>
            <SplitTime status="Additional">
            <ControlCode>1</ControlCode>
            <Time>-4</Time>
            </SplitTime>
            <SplitTime>
            <ControlCode>247</ControlCode>
            <Time>7</Time>
            </SplitTime>
            <SplitTime status="Additional">
            <ControlCode>RDO</ControlCode>
            <Time>1917</Time>
            </SplitTime>
        </Result>
        </PersonResult>
    </ClassResult>
    <ClassResult>
        <Class>
        <Name>Short</Name>
        </Class>
        <Course>
        <Name>Short</Name>
        <Length>1800</Length>
        <NumberOfControls>1</NumberOfControls>
        </Course>
        <PersonResult>
        <Person sex="M">
            <Id type="BOF" />
            <Name>
            <Family>Gloves</Family>
            <Given>Albert</Given>
            </Name>
            <BirthDate>2002-12-31</BirthDate>
        </Person>
        <Organisation>
            <Name>ESOC</Name>
        </Organisation>
        <Result>
            <StartTime>2021-08-11T18:24:46</StartTime>
            <FinishTime>2021-08-11T18:48:20</FinishTime>
            <Time>1414</Time>
            <TimeBehind>0</TimeBehind>
            <Position>1</Position>
            <Status>OK</Status>
            <SplitTime status="Additional">
            <ControlCode>1</ControlCode>
            <Time>-3</Time>
            </SplitTime>
            <SplitTime>
            <ControlCode>246</ControlCode>
            <Time>4</Time>
            </SplitTime>
            <SplitTime status="Additional">
            <ControlCode>RDO</ControlCode>
            <Time>1414</Time>
            </SplitTime>
        </Result>
        </PersonResult>
        <PersonResult>
        <Person sex="F">
            <Id type="BOF" />
            <Name>
            <Family>Walks</Family>
            <Given>Claire</Given>
            </Name>
            <BirthDate>1969-03-26</BirthDate>
        </Person>
        <Organisation>
            <Name>ESOC</Name>
        </Organisation>
        <Result>
            <StartTime>2021-08-11T18:07:11</StartTime>
            <FinishTime>2021-08-11T18:32:50</FinishTime>
            <Time>1539</Time>
            <TimeBehind>125</TimeBehind>
            <Position>2</Position>
            <Status>OK</Status>
            <SplitTime status="Additional">
            <ControlCode>1</ControlCode>
            <Time>-6</Time>
            </SplitTime>
            <SplitTime>
            <ControlCode>246</ControlCode>
            <Time>4</Time>
            </SplitTime>
            <SplitTime status="Additional">
            <ControlCode>RDO</ControlCode>
            <Time>1539</Time>
            </SplitTime>
        </Result>
        </PersonResult>
        <PersonResult>
        <Person sex="F">
            <Id type="BOF" />
            <Name>
            <Family>Forest</Family>
            <Given>Ella</Given>
            </Name>
            <BirthDate>2008-06-01</BirthDate>
        </Person>
        <Result>
            <StartTime>2021-08-11T19:06:58</StartTime>
            <FinishTime>2021-08-11T19:33:50</FinishTime>
            <Time>1612</Time>
            <TimeBehind>198</TimeBehind>
            <Position>3</Position>
            <Status>OK</Status>
            <SplitTime status="Additional">
            <ControlCode>1</ControlCode>
            <Time>-9</Time>
            </SplitTime>
            <SplitTime>
            <ControlCode>246</ControlCode>
            <Time>5</Time>
            </SplitTime>
            <SplitTime status="Additional">
            <ControlCode>RDO</ControlCode>
            <Time>1612</Time>
            </SplitTime>
        </Result>
        </PersonResult>
        <PersonResult>
        <Person sex="F">
            <Id type="BOF" />
            <Name>
            <Family>Fish</Family>
            <Given>Gill</Given>
            </Name>
            <BirthDate>1951-12-31</BirthDate>
        </Person>
        <Organisation>
            <Name>ESOC</Name>
        </Organisation>
        <Result>
            <StartTime>2021-08-11T18:00:21</StartTime>
            <FinishTime>2021-08-11T19:16:36</FinishTime>
            <Time>4575</Time>
            <Status>Disqualified</Status>
            <SplitTime status="Additional">
            <ControlCode>1</ControlCode>
            <Time>-3</Time>
            </SplitTime>
            <SplitTime>
            <ControlCode>246</ControlCode>
            <Time>7</Time>
            </SplitTime>
            <SplitTime status="Additional">
            <ControlCode>RDO</ControlCode>
            <Time>4575</Time>
            </SplitTime>
        </Result>
        </PersonResult>
                <PersonResult>
        <Person sex="F">
            <Id type="BOF" />
            <Name>
            <Family>Fish</Family>
            <Given>Gill</Given>
            </Name>
            <BirthDate>2018-12-31</BirthDate>
        </Person>
        <Organisation>
            <Name>ESOC</Name>
        </Organisation>
        <Result>
            <StartTime>2021-08-11T18:00:21</StartTime>
            <FinishTime>2021-08-11T19:16:36</FinishTime>
            <Time>4575</Time>
            <Status>Disqualified</Status>
            <SplitTime status="Additional">
            <ControlCode>1</ControlCode>
            <Time>-3</Time>
            </SplitTime>
            <SplitTime>
            <ControlCode>246</ControlCode>
            <Time>7</Time>
            </SplitTime>
            <SplitTime status="Additional">
            <ControlCode>RDO</ControlCode>
            <Time>4575</Time>
            </SplitTime>
        </Result>
        </PersonResult>
    </ClassResult>
    </ResultList>
"""
empty_results_list = '<ResultList xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" iofVersion="3.0" xmlns="http://www.orienteering.org/datastandard/3.0" xsi:schemaLocation="http://www.orienteering.org/datastandard/3.0 http://www.orienteering.org/datastandard/IOF.xsd"></ResultList>'


class TestImportXML(unittest.TestCase):
    def test_iof_example_is_imported_correctly(self) -> None:
        self.assertEqual(
            list(process_xml_file(iof_example_xml_file)),
            [
                {
                    "firstName": "George",
                    "surname": "Wood",
                    "course": "Men Elite",
                    "time": "2001",
                    "club": "OC Back and Forth",
                    "status": "OK",
                    "birthDate": "",
                    "gender": "",
                },
                {
                    "firstName": "Edgar",
                    "surname": "Martin",
                    "course": "Men Elite",
                    "time": "2202",
                    "club": "Bushmen OC",
                    "status": "MissingPunch",
                    "birthDate": "",
                    "gender": "",
                },
                {
                    "firstName": "Toni",
                    "surname": "Lawson",
                    "course": "Open",
                    "time": "",
                    "club": "Doubtful Direction",
                    "status": "DidNotStart",
                    "birthDate": "",
                    "gender": "",
                },
            ],
        )

    def test_iof_example_extra_tags_is_imported_correctly(self) -> None:
        self.assertEqual(
            list(process_xml_file(iof_extra_tags_example)),
            [
                {
                    "firstName": "George",
                    "surname": "Wood",
                    "course": "Men Elite",
                    "time": "2001",
                    "club": "OC Back and Forth",
                    "status": "OK",
                    "birthDate": "",
                    "gender": "",
                },
                {
                    "firstName": "Edgar",
                    "surname": "Martin",
                    "course": "Men Elite",
                    "time": "2202",
                    "club": "Bushmen OC",
                    "status": "MissingPunch",
                    "birthDate": "",
                    "gender": "",
                },
            ],
        )

    def test_iof_example_raises_if_not_resultslist(self) -> None:
        self.assertRaises(
            ImportException, lambda: list(process_xml_file(iof_extry_list))
        )

    def test_sitiming_export_with_age_class(self) -> None:
        self.assertEqual(
            list(process_xml_file(sitiming_export)),
            [
                {
                    "course": "Long",
                    "firstName": "James",
                    "surname": "Adamson",
                    "time": "1620",
                    "club": "INT",
                    "status": "OK",
                    "birthDate": "2000-05-02",
                    "gender": "M",
                },
                {
                    "course": "Long",
                    "firstName": "Phil",
                    "surname": "Ashbrook",
                    "time": "1631",
                    "club": "OD",
                    "status": "OK",
                    "birthDate": "2000-02-31",
                    "gender": "M",
                },
                {
                    "course": "Long",
                    "firstName": "Josie",
                    "surname": "Horse",
                    "time": "1837",
                    "club": "ESOC",
                    "status": "OK",
                    "birthDate": "1981-12-31",
                    "gender": "F",
                },
                {
                    "course": "Long",
                    "firstName": "Simon",
                    "surname": "Evans",
                    "time": "1917",
                    "club": "ESOC",
                    "status": "OK",
                    "birthDate": "1998-12-31",
                    "gender": "M",
                },
                {
                    "course": "Short",
                    "firstName": "Albert",
                    "surname": "Gloves",
                    "time": "1414",
                    "club": "ESOC",
                    "status": "OK",
                    "birthDate": "2002-12-31",
                    "gender": "M",
                },
                {
                    "course": "Short",
                    "firstName": "Claire",
                    "surname": "Walks",
                    "time": "1539",
                    "club": "ESOC",
                    "status": "OK",
                    "birthDate": "1969-03-26",
                    "gender": "F",
                },
                {
                    "course": "Short",
                    "firstName": "Ella",
                    "surname": "Forest",
                    "time": "1612",
                    "club": "",
                    "status": "OK",
                    "birthDate": "2008-06-01",
                    "gender": "F",
                },
                {
                    "course": "Short",
                    "firstName": "Gill",
                    "surname": "Fish",
                    "time": "4575",
                    "club": "ESOC",
                    "status": "Disqualified",
                    "birthDate": "1951-12-31",
                    "gender": "F",
                },
                {
                    "course": "Short",
                    "firstName": "Gill",
                    "surname": "Fish",
                    "time": "4575",
                    "club": "ESOC",
                    "status": "Disqualified",
                    "birthDate": "2018-12-31",
                    "gender": "F",
                },
            ],
        )

    def test_raises_if_no_classes(self) -> None:
        self.assertRaises(
            ImportException,
            lambda: list(process_xml_file(empty_results_list)),
        )
